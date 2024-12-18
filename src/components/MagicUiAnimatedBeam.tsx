"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "lib/utils";
import { AnimatedBeam } from "components/magicui/animated-beam.tsx";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function MagicUiAnimatedBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="tailwind-scope">
      <div
        className="relative flex h-[500px] w-full items-center justify-center overflow-hidden bg-background p-10"
        ref={containerRef}
      >
        <div className="flex size-full flex-col max-w-lg max-h-[200px] items-stretch justify-between gap-10">
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div1Ref}>
              <Icons.VanPeople />
            </Circle>
            <Circle ref={div5Ref}>
              <Icons.RedNote />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div2Ref}>
              <Icons.Kijiji />
            </Circle>
            <Circle ref={div4Ref} className="size-16">
              <Icons.Collectly />
            </Circle>
            <Circle ref={div6Ref}>
              <Icons.Facebook />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div3Ref}>
              <Icons.Craigslist />
            </Circle>
            <Circle ref={div7Ref}>
              <Icons.VanSky />
            </Circle>
          </div>
        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div4Ref}
          curvature={-75}
          endYOffset={-10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div4Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div4Ref}
          curvature={75}
          endYOffset={10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div4Ref}
          curvature={-75}
          endYOffset={-10}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div4Ref}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div7Ref}
          toRef={div4Ref}
          curvature={75}
          endYOffset={10}
          reverse
        />
      </div>
    </div>
  );
}

const Icons = {
  Kijiji: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image
        href="/kijiji-logo.svg"
        x="-15"
        y="-15"
        width="150"
        height="150"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  ),
  Collectly: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image
        href="/logo.png"
        x="-5"
        y="-5"
        width="100"
        height="100"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  ),
  VanPeople: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image
        href="/vanpeople-logo.png"
        x="-10"
        y="-10"
        width="120"
        height="120"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  ),
  Craigslist: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image
        href="/craigslist-logo.jpg"
        x="-45"
        y="-45"
        width="190"
        height="190"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  ),
  RedNote: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image
        href="/rednote-logo.png"
        x="-25"
        y="-20"
        width="140"
        height="140"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  ),
  VanSky: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image href="/vansky-logo.png" x="0" y="0" width="100" height="100" />
    </svg>
  ),
  Facebook: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image
        href="/facebook-logo.png"
        x="-40"
        y="-40"
        width="180"
        height="180"
      />
    </svg>
  ),
};
