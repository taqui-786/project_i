import React, { useEffect, useState } from "react";
import { FileDataTypes } from "../../types/gallery";
import GalleryGrid from "./GalleryGrid";
import FullScreenView from "./FullScreenView";
import { getFilesFromTi } from "@/lib/Firebase";
import TypingText from "./customComponents/TypingText";

type GalleryPageProps = {
  isLocked: boolean;
};

function GalleryPage({ isLocked }: GalleryPageProps) {
  const [selectedItem, setSelectedItem] = useState<FileDataTypes | null>(null);
  const [files, setFiles] = useState<FileDataTypes[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const filesData = await getFilesFromTi();
    
        setFiles(filesData);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleItemClick = (item: FileDataTypes) => {
    setSelectedItem({
      fullPath: item.name || "",
   
      url: item.url || "",
      name: item.name || "",
    });
  };

  if (isLocked) return <div>Gallery is locked</div>;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="aspect-video rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gray-200 animate-pulse">
                <div className="h-full w-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.5 12c0-1.232-.046-2.453-.134-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.332 0 4.006 4.006 0 00-3.7 3.7c-.088 1.209-.134 2.43-.134 3.662C4.5 13.232 4.546 14.453 4.634 15.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.332 0 4.006 4.006 0 003.7-3.7c.088-1.209.134-2.43.134-3.662zM10.5 8.25a1.5 1.5 0 013 0v1.5a1.5 1.5 0 01-3 0v-1.5zM7.5 15a1.5 1.5 0 013 0v1.5a1.5 1.5 0 01-3 0V15zm9 0a1.5 1.5 0 013 0v1.5a1.5 1.5 0 01-3 0V15z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold ">Project-i</h1>
       
        <TypingText text="💖 Ishana Parween" className="w-[195px] " />
        </div>
      <GalleryGrid items={files} onItemClick={handleItemClick} />
      {selectedItem && (
        <FullScreenView
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

export default GalleryPage;
