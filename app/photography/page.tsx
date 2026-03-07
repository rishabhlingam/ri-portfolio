import { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import PhotoGallery from "@/components/content/PhotoGallery";

export const metadata: Metadata = { title: "Photography" };

export default async function PhotographyPage() {
  const photos: never[] = [];
  return (
    <div className="min-h-screen">
      <PageHeader title="Photography" description="Capturing fleeting moments — street photography, landscapes, and everyday geometry."
        backHref="/beyond-code" backLabel="← Beyond Code" />
      <div className="max-w-5xl mx-auto px-10 md:px-20 pb-24">
        {photos.length === 0
          ? <p className="text-white/30 text-sm py-12">No photos yet. Come back soon.</p>
          : <PhotoGallery photos={photos} />}
      </div>
    </div>
  );
}
