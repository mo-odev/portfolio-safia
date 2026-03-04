import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Video {
  id: string;
  title: string;
  category: "ugc" | "creative";
  subcategory?: "IA" | "formation" | "programs" | "montage";
  thumbnail: string;
  duration: string;
}

const videosData = [
  { id: "1", title: "Hightech Produit", category: "ugc", thumbnail: "/assets/video_ugc1.mp4", duration: "0:32" },
  { id: "2", title: "Hightech Produit", category: "ugc", thumbnail: "/assets/video_ugc2.mp4", duration: "0:45" },
  { id: "5", title: "video IA", category: "creative", thumbnail: "/assets/creatif/IA.1.mp4", duration: "1:12" },
  { id: "6", title: "video IA + voix off", category: "creative", thumbnail: "/assets/creatif/IA.2.mp4", duration: "0:55" },
  { id: "7", title: "Formation Video", category: "creative", thumbnail: "/assets/creatif/formation.1.mp4", duration: "0:42" },
  { id: "8", title: "video creative", category: "creative", thumbnail: "/assets/creatif/logiciel.1.mp4", duration: "1:00" },
  { id: "9", title: "video IA", category: "creative", thumbnail: "/assets/creatif/IA.3.mp4", duration: "1:05" },
  { id: "10", title: "video IA", category: "creative", thumbnail: "/assets/creatif/IA.4.mp4", duration: "0:58" },
  { id: "11", title: "video IA", category: "creative", thumbnail: "/assets/creatif/IA.5.mp4", duration: "1:10" },
  { id: "12", title: "Formation Video ", category: "creative", thumbnail: "/assets/creatif/formation.2.mp4", duration: "1:41" },
  { id: "13", title: "Montage", category: "creative", thumbnail: "/assets/montaje/montaje.1.mp4", duration: "0:45" },
  { id: "14", title: "Montage", category: "creative", thumbnail: "/assets/montaje/montaje.2.mp4", duration: "1:15" },
  { id: "15", title: "Montage", category: "creative", thumbnail: "/assets/montaje/montaje.3.mp4", duration: "1:00" },
  { id: "16", title: "Montage", category: "creative", thumbnail: "/assets/montaje/montaje.4.mp4", duration: "0:30" },
];

// Function to extract subcategory from filename
const getSubcategoryFromFilename = (filename: string): "IA" | "formation" | "programs" | "montage" => {
  if (!filename) return "IA";
  const name = filename.toLowerCase();
  // Check for specific keywords in the filename
  if (name.includes("formation")) return "formation";
  if (name.includes("logiciel") || name.includes("software")) return "programs";
  if (name.includes("montaje") || name.includes("montage")) return "montage";
  return "IA";
};

// Add subcategory based on filename
const videos: Video[] = videosData.map((video) => ({
  ...video,
  subcategory: video.category === "creative" && video.thumbnail ? getSubcategoryFromFilename(video.thumbnail) : video.subcategory,
}));

const videoRefs = new Map<string, HTMLVideoElement>();

const VideoCard = ({ video, playingVideoId, onVideoPlay }: { video: Video; playingVideoId: string | null; onVideoPlay: (videoId: string) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPlaying = playingVideoId === video.id;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      onVideoPlay("");
    } else {
      onVideoPlay(video.id);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Play can be interrupted when switching quickly between cards
        });
      }
    }
  };

  const handleVideoRef = (el: HTMLVideoElement | null) => {
    if (el) {
      videoRef.current = el;
      videoRefs.set(video.id, el);
    }
  };

  return (
    <div className="group soft-card soft-card-hover overflow-hidden cursor-pointer">
      {video.thumbnail ? (
        <div className="aspect-[9/16] bg-secondary flex items-center justify-center relative overflow-hidden">
          <video
            ref={handleVideoRef}
            className="video-card-player w-full h-full object-cover"
            controls={false}
            controlsList="nodownload noplaybackrate nofullscreen"
            disablePictureInPicture
            preload="metadata"
            playsInline
            onClick={handlePlayClick}
          >
            <source src={video.thumbnail} type="video/mp4" />
            متصفحك لا يدعم تشغيل الفيديو
          </video>
          <span className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-card/90 px-2 py-1 rounded-md pointer-events-none" style={{ boxShadow: "var(--shadow-soft)" }}>
            {video.duration}
          </span>
        </div>
      ) : (
        <div className="aspect-[9/16] bg-secondary flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-card/90 px-2 py-1 rounded-md" style={{ boxShadow: "var(--shadow-soft)" }}>
            {video.duration}
          </span>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 truncate">
          {video.title}
        </h3>
      </div>
    </div>
  );
};

const VideoShowcase = () => {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<"IA" | "formation" | "programs" | "montage">("IA");

  const handleVideoPlay = (videoId: string) => {
    // Pause any previously playing video
    if (playingVideoId && playingVideoId !== videoId) {
      const previousVideo = videoRefs.get(playingVideoId);
      if (previousVideo) {
        // Handle pause errors gracefully
        const pausePromise = previousVideo.pause();
        if (pausePromise !== undefined) {
          pausePromise.catch(() => {
            // Pause was interrupted, this is expected
          });
        }
      }
    }
    setPlayingVideoId(videoId || null);
  };

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-foreground">
          Mon <span className="gradient-text">Travail</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-md mx-auto">
          Une sélection curatée de mes meilleurs projets vidéo UGC et créatifs.
        </p>

        <Tabs defaultValue="ugc" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-secondary h-12 px-1 rounded-full">
              <TabsTrigger
                value="ugc"
                className="px-6 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                Vidéos UGC
              </TabsTrigger>
              <TabsTrigger
                value="creative"
                className="px-6 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                Contenu Créatif
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="ugc">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {videos.filter((v) => v.category === "ugc").map((v) => (
                <VideoCard key={v.id} video={v} playingVideoId={playingVideoId} onVideoPlay={handleVideoPlay} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="creative">
            <div className="flex justify-center mb-8 px-2 sm:mb-12">
              <div className="inline-flex flex-wrap gap-2 p-1 bg-secondary rounded-full justify-center w-full sm:w-auto">
                <button
                  onClick={() => setSelectedSubcategory("IA")}
                  className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                    selectedSubcategory === "IA"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  IA
                </button>
                <button
                  onClick={() => setSelectedSubcategory("formation")}
                  className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                    selectedSubcategory === "formation"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Formation
                </button>
                <button
                  onClick={() => setSelectedSubcategory("programs")}
                  className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                    selectedSubcategory === "programs"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Logiciel
                </button>
                <button
                  onClick={() => setSelectedSubcategory("montage")}
                  className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                    selectedSubcategory === "montage"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Montage
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {videos.filter((v) => v.category === "creative" && v.subcategory === selectedSubcategory).map((v) => (
                <VideoCard key={v.id} video={v} playingVideoId={playingVideoId} onVideoPlay={handleVideoPlay} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default VideoShowcase;
