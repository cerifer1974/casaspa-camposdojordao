import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function VideoBreak() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && videoRef.current && !loaded && !error) {
      videoRef.current.load();
      const tryPlay = () => videoRef.current?.play().catch(() => setError(true));
      tryPlay();
      videoRef.current.addEventListener("loadeddata", () => setLoaded(true));
      videoRef.current.addEventListener("error", () => setError(true));
    }
  }, [inView, loaded, error]);

  return (
    <section
      ref={containerRef}
      className="relative isolate overflow-hidden bg-primary"
      style={{ height: "clamp(65vh, 85vh, 90vh)" }}
    >
      {/* Poster / fallback */}
      <div
        className={cn(
          "absolute inset-0 z-0 transition-opacity duration-700",
          inView && !error ? "opacity-0" : "opacity-100"
        )}
      >
        <img
          src="/images/SaveClip.App_780238939_18608639719022245_1841419069032026891_n.jpg"
          alt="Amanhecer na Casa Spa"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/10 to-primary/60" />
      </div>

      {/* Video */}
      {inView && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-700",
            loaded && !error ? "opacity-100" : "opacity-0"
          )}
          muted
          loop
          playsInline
          autoPlay={false} /* controlado via IntersectionObserver */
          preload="none"
          poster="/images/SaveClip.App_780238939_18608639719022245_1841419069032026891_n.jpg"
          onCanPlay={() => setLoaded(true)}
          onError={() => setError(true)}
        >
          <source
            src="/videos/Amanhecer.mp4"
            type="video/mp4"
          />
        </video>
      )}

      {/* Legenda */}
      <div className="absolute bottom-8 left-8 z-20 md:bottom-10 md:left-12 lg:bottom-14 lg:left-16">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-primary-foreground/70">
          O amanhecer visto da Casa Spa
        </p>
      </div>

      {/* Mobile height override via CSS-in-JS handled via media query in parent or here */}
      <style>{`
        @media (max-width: 767px) {
          section[ref] { height: 85vh !important; }
        }
      `}</style>
    </section>
  );
}
