import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SiCivicrm } from "react-icons/si";
function Logo() {
  return (
    <div className="flex gap-2 items-center justify-center">
    <div>Arman CRM</div>
    <Button size="icon" asChild>      
      <Link href="/">
        <SiCivicrm className="w-6 h-6" />
      </Link>
    </Button>
    
    </div>
  );
}

export default Logo;
