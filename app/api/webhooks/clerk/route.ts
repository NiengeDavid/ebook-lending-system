import { Webhook } from "svix";
import { getClient } from "@/sanity/lib/sanity.client";
import { writeToken } from "@/sanity/lib/sanity.api";

export const POST = async (req: Request) => {
  const client = getClient({ token: writeToken });

  if (!process.env.CLERK_WEBHOOK_SECRET) {
    return new Response(
      JSON.stringify({ error: "CLERK_WEBHOOK_SECRET is not defined." }),
      { status: 500 }
    );
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  try {
    const body = await req.text();
    const headers = Object.fromEntries(req.headers.entries());
    const payload = wh.verify(body, headers);
    const user = (payload as { data: any }).data;

    if (!user || !user.id) {
      return new Response(
        JSON.stringify({ error: "Invalid payload: Missing user ID." }),
        { status: 400 }
      );
    }

    const uploadImage = async (imageUrl: string) => {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const blob = await response.blob();

        const asset = await client.assets.upload("image", blob, {
          filename: "user-profile-image",
        });

        return asset._id;
      } catch (error) {
        console.error("Image upload failed:", error);
        return undefined;
      }
    };

    const imageRef = user.image_url
      ? await uploadImage(user.image_url)
      : undefined;

    const email =
      user.unsafe_metadata?.email ||
      (user.email_addresses.length > 0
        ? user.email_addresses[0].email_address
        : "Unknown Email");

    const userDoc = {
      _id: `user-${user.id}`,
      _type: "user",
      userId: user.id,
      firstname: user.first_name,
      lastname: user.last_name,
      image: imageRef
        ? {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageRef,
            },
          }
        : undefined,
      contact: {
        _type: "object",
        email: email,
      },
      academic: {
        _type: "object",
        regNumber: user.unsafe_metadata?.registrationNumber,
      },
      authStatus: "pending",
    };

    const existingUser = await client.getDocument(`user-${user.id}`);
    if (!existingUser) {
      await client.createIfNotExists(userDoc);
    } else {
      await client.patch(`user-${user.id}`).set(userDoc).commit();
    }

    return new Response(JSON.stringify({ success: true, data: userDoc }), {
      status: 200,
    });
  } catch (err) {
    console.error("Webhook processing failed:", err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "An unknown error occurred",
      }),
      { status: 500 }
    );
  }
};
