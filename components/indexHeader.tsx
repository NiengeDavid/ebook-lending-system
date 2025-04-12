import Container from "./container";
import Link from "next/link";
import Image from "next/image";
import { siteDetails } from "@/data/siteDetails";

export default function IndexHeader() {
    return (
        <header className="bg-white w-full shadow-md">
            <Container className="!px-0">
                <nav className="shadow-md flex justify-between items-center py-4 px-5 md:shadow-none">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image 
                            src={siteDetails.siteLogo}
                            alt={siteDetails.siteName}
                            width={32}
                            height={32}
                            className="rounded-full shadow-md"
                            priority
                        />
                        <span className="manrope text-xl font-semibold text-primary-red cursor-pointer">
                            {siteDetails.siteName}
                        </span>
                    </Link>
                </nav>
            </Container>
        </header>
    )
}