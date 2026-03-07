import { notFound } from "next/navigation";

interface Props { params: Promise<{ slug: string }> }

export default async function PhotoPage({ params }: Props) {
  const { slug } = await params;
  void slug;
  notFound();
}
