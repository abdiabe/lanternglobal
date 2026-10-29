import {
  BriefcaseBusiness,
  Building2,
  Calculator,
  ChartColumn,
  CodeXml,
  HardHat,
  Home,
  Hotel,
  KeyRound,
  Landmark,
  Megaphone,
  Network,
  Package,
  Palette,
  Scale,
  ShoppingCart,
  Stethoscope,
  Truck,
  UsersRound,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/content/types";

const map = {
  briefcase: BriefcaseBusiness,
  megaphone: Megaphone,
  calculator: Calculator,
  code: CodeXml,
  scale: Scale,
  stethoscope: Stethoscope,
  hardhat: HardHat,
  users: UsersRound,
  chart: ChartColumn,
  palette: Palette,
  truck: Truck,
  cart: ShoppingCart,
  building: Building2,
  home: Home,
  hotel: Hotel,
  landmark: Landmark,
  network: Network,
  package: Package,
  key: KeyRound,
} satisfies Record<IconName, unknown>;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = map[name];
  return <Cmp aria-hidden="true" focusable="false" {...props} />;
}

/** Rounded icon tile used on cards. */
export function IconTile({ name, tone = "light", className = "" }: { name: IconName; tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
        tone === "dark" ? "bg-white/10 text-glow ring-1 ring-white/15" : "bg-brand-soft text-brand-strong ring-1 ring-brand-tint"
      } ${className}`}
    >
      <Icon name={name} className="h-5 w-5" strokeWidth={1.75} />
    </span>
  );
}
