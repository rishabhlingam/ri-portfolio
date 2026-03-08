import { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import PhotoGallery from "@/components/content/PhotoGallery";
import WorkInProgress from "@/components/ui/WorkInProgress";
import { getPhotos } from "@/lib/sanity/queries";

export const metadata: Metadata = { title: "Photography" };

export default async function PhotographyPage() {
  const photos = await getPhotos();

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Photography"
        description="Capturing fleeting moments — street photography, landscapes, and everyday geometry."
        backHref="/beyond-code"
        backLabel="← Beyond Code"
      />
      <div className="max-w-5xl mx-auto px-10 md:px-20 pb-24">
        {!photos?.length ? (
          <WorkInProgress message="Photos are being curated. Come back soon." />
        ) : (
          <PhotoGallery photos={photos} />
        )}
      </div>
    </div>
  );
}
