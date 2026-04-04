import { notFound } from "next/navigation";

/** Internal rewrite target from middleware for disabled content sections. */
export default function DisabledSubroutesTrigger() {
  notFound();
}
