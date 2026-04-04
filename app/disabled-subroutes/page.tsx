import { notFound } from "next/navigation";

/** Internal rewrite target from proxy for disabled content sections. */
export default function DisabledSubroutesTrigger() {
  notFound();
}
