import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

function SwanAnimation() {
  const sceneRef = useRef(null);
  const stateRef = useRef("idle");
  const floatTLRef = useRef(null);
  const neckTLRef = useRef(null);
  const wingTLRef = useRef(null);

  const setState = useCallback((next) => {
    stateRef.current = next;
  }, []);

  const idle = useCallback(() => {
    if (stateRef.current === "flap") return;
    setState("idle");
    const svg = sceneRef.current;
    gsap.to(svg.querySelector("#swan"), {
      y: 0, duration: 0.7, ease: "sine.out",
      onComplete: () => floatTLRef.current?.play(),
    });
    gsap.to(svg.querySelector("#neck-head"), {
      rotation: 0, svgOrigin: "336 752", duration: 0.7, ease: "sine.out",
      onComplete: () => neckTLRef.current?.play(),
    });
    gsap.to(svg.querySelector("#wing"), {
      rotation: 0, scaleY: 1, svgOrigin: "520 700", duration: 0.55, ease: "sine.out",
      onComplete: () => wingTLRef.current?.play(),
    });
  }, [setState]);

  const alertState = useCallback(() => {
    if (stateRef.current === "flap") return;
    setState("alert");
    floatTLRef.current?.pause();
    neckTLRef.current?.pause();
    wingTLRef.current?.pause();
    const svg = sceneRef.current;
    gsap.to(svg.querySelector("#swan"), { y: -22, duration: 0.45, ease: "power2.out" });
    gsap.to(svg.querySelector("#neck-head"), { rotation: -3.5, svgOrigin: "336 752", duration: 0.6, ease: "power2.out" });
    gsap.to(svg.querySelector("#wing"), { rotation: -3, scaleY: 1.025, svgOrigin: "520 700", duration: 0.45, ease: "power2.out" });
  }, [setState]);

  const flap = useCallback(() => {
    if (stateRef.current === "flap") return;
    setState("flap");
    floatTLRef.current?.pause();
    neckTLRef.current?.pause();
    wingTLRef.current?.pause();
    const svg = sceneRef.current;
    const wing = svg.querySelector("#wing");
    const raisedWing = svg.querySelector("#raised-wing");
    const swan = svg.querySelector("#swan");

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(raisedWing, { opacity: 0, rotation: 0, scale: 1 });
        gsap.set(wing, { opacity: 1 });
        idle();
      },
    });
    tl.to(wing, { opacity: 0, duration: 0.12 }, 0)
      .fromTo(raisedWing,
        { opacity: 0, rotation: 18, scale: 0.82, svgOrigin: "500 710" },
        { opacity: 1, rotation: -10, scale: 1, svgOrigin: "500 710", duration: 0.28, ease: "back.out(1.6)" }, 0.08)
      .to(raisedWing, { rotation: 16, svgOrigin: "500 710", duration: 0.18, ease: "power2.in" })
      .to(swan, { y: 6, duration: 0.18, ease: "power2.in" }, "<")
      .to(raisedWing, { rotation: -13, svgOrigin: "500 710", duration: 0.22, ease: "power2.out" })
      .to(swan, { y: -14, duration: 0.22, ease: "power2.out" }, "<")
      .to(raisedWing, { rotation: 12, svgOrigin: "500 710", duration: 0.2, ease: "sine.inOut" })
      .to(swan, { y: 2, duration: 0.2, ease: "sine.inOut" }, "<")
      .to(raisedWing, { rotation: -4, svgOrigin: "500 710", duration: 0.18, ease: "power2.out" })
      .to(swan, { y: -8, duration: 0.18, ease: "power2.out" }, "<")
      .to({}, { duration: 0.16 })
      .to(raisedWing, { opacity: 0, rotation: 18, scale: 0.84, svgOrigin: "500 710", duration: 0.24, ease: "power2.in" })
      .to(wing, { opacity: 1, duration: 0.18 }, "<0.08");
  }, [setState, idle]);

  useEffect(() => {
    const svg = sceneRef.current;
    if (!svg) return;

    // Persistent looping animations
    floatTLRef.current = gsap.to(svg.querySelector("#swan"), {
      y: -14, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true,
    });
    neckTLRef.current = gsap.to(svg.querySelector("#neck-head"), {
      rotation: 1.1, svgOrigin: "336 752", duration: 4.2, ease: "sine.inOut", repeat: -1, yoyo: true,
    });
    wingTLRef.current = gsap.to(svg.querySelector("#wing"), {
      rotation: -1.6, scaleY: 1.015, svgOrigin: "520 700", duration: 2.2, ease: "sine.inOut", repeat: -1, yoyo: true,
    });

    gsap.utils.toArray(svg.querySelectorAll(".feather")).forEach((el, i) => {
      gsap.to(el, { rotation: i % 2 ? 1.8 : -1.6, svgOrigin: "300 705", duration: 1.8 + i * 0.16, ease: "sine.inOut", repeat: -1, yoyo: true, delay: i * 0.14 });
    });
    gsap.utils.toArray(svg.querySelectorAll(".ripple")).forEach((el, i) => {
      gsap.fromTo(el, { scale: 0.82, opacity: 0.5, transformOrigin: "50% 50%" }, { scale: 1.25, opacity: 0.02, duration: 3.8, repeat: -1, ease: "power1.out", delay: i * 1.1 });
    });
    gsap.utils.toArray(svg.querySelectorAll(".lotus")).forEach((el, i) => {
      gsap.to(el, { rotation: i % 2 ? -3 : 3, transformOrigin: "50% 100%", duration: 2.8 + i * 0.3, ease: "sine.inOut", repeat: -1, yoyo: true, delay: i * 0.3 });
    });
    gsap.utils.toArray(svg.querySelectorAll(".grass")).forEach((el, i) => {
      gsap.to(el, { rotation: i % 2 ? 1.6 : -1.6, transformOrigin: "50% 50%", duration: 3.4 + i * 0.25, ease: "sine.inOut", repeat: -1, yoyo: true });
    });

    setState("idle");

    return () => {
      gsap.killTweensOf(svg.querySelectorAll("*"));
      floatTLRef.current?.kill();
      neckTLRef.current?.kill();
      wingTLRef.current?.kill();
    };
  }, [setState]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(circle at 50% 18%, rgba(95,188,211,0.18), transparent 38%), linear-gradient(180deg,#0a1c30,#123048)",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        color: "#d4ecf5",
        overflow: "hidden",
      }}
    >
      <style>{`
        #swan, #neck-head, #wing, #raised-wing, .lotus, .leaf, .ripple, .feather, .grass {
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>

      <div style={{ width: "min(94vw,980px)", display: "grid", gap: 18, justifyItems: "center" }}>
        <div style={{ fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", opacity: 0.78 }}>
          Blue Swan · Lotus Lake · Rive-Style
        </div>

        {/* Stage */}
        <section
          style={{
            width: "min(92vw,720px)",
            aspectRatio: "1/1",
            borderRadius: "50%",
            background: "rgba(6,22,40,0.5)",
            boxShadow: "0 28px 90px rgba(0,0,0,0.42), inset 0 0 0 1px rgba(130,205,230,0.14)",
            overflow: "hidden",
          }}
        >
          <svg
            ref={sceneRef}
            id="scene"
            viewBox="0 0 1000 1000"
            role="img"
            aria-label="Animated blue swan on a lotus lake"
            style={{ width: "100%", height: "100%", display: "block", cursor: "pointer", userSelect: "none" }}
            onMouseEnter={alertState}
            onMouseLeave={idle}
            onClick={flap}
          >
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#EAF6F2" /><stop offset="1" stopColor="#BFE3DC" />
              </linearGradient>
              <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#A8DCD3" /><stop offset="0.45" stopColor="#5FBCD3" /><stop offset="1" stopColor="#2E7FC2" />
              </linearGradient>
              <linearGradient id="swanNeck" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9ed6ff" /><stop offset="45%" stopColor="#55adff" /><stop offset="100%" stopColor="#0962dd" />
              </linearGradient>
              <linearGradient id="deepBlue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#52b5ff" /><stop offset="100%" stopColor="#053b9c" />
              </linearGradient>
              <linearGradient id="beakBlue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9ed6ff" /><stop offset="65%" stopColor="#3f9bff" /><stop offset="100%" stopColor="#0d5fd0" />
              </linearGradient>
              <clipPath id="circle-clip"><circle cx="500" cy="500" r="468" /></clipPath>
              <g id="pad">
                <path d="M0 0 L42 -9 A44 18 0 1 0 42 9 Z" fill="#66BB6A" />
                <path d="M-4 0 L30 -6 A32 12 0 1 0 30 6 Z" fill="#81C784" />
              </g>
              <g id="lotus2">
                <ellipse cx="0" cy="0" rx="34" ry="9" fill="#EC407A" />
                <path d="M-34 -2 Q-46 -22 -36 -40 Q-16 -28 -12 -6 Z" fill="#F06292" />
                <path d="M34 -2 Q46 -22 36 -40 Q16 -28 12 -6 Z" fill="#F06292" />
                <path d="M-20 -4 Q-30 -34 -14 -54 Q-2 -34 -2 -6 Z" fill="#F48FB1" />
                <path d="M20 -4 Q30 -34 14 -54 Q2 -34 2 -6 Z" fill="#F48FB1" />
                <path d="M0 -6 Q-13 -36 0 -64 Q13 -36 0 -6 Z" fill="#F8BBD0" />
                <path d="M0 -12 Q-6 -34 0 -56 Q6 -34 0 -12 Z" fill="#FCE4EC" />
              </g>
              <clipPath id="beakClip">
                <path d="M735 224 C785 234 850 268 898 304 C910 313 903 325 888 322 C829 310 771 286 720 263 C711 248 716 231 735 224 Z" />
              </clipPath>
            </defs>

            <g clipPath="url(#circle-clip)">
              <rect x="32" y="32" width="936" height="936" fill="url(#sky)" />
              <rect x="32" y="430" width="936" height="538" fill="url(#water)" />
              <rect x="32" y="404" width="936" height="64" fill="#CFE9E2" opacity="0.7" />

              {/* Background lotus pads */}
              <g opacity="0.75">
                <use className="lotus" href="#pad" transform="translate(200,452) scale(0.55)" />
                <use className="lotus" href="#pad" transform="translate(420,438) scale(0.45)" />
                <use className="lotus" href="#pad" transform="translate(740,446) scale(0.5)" />
                <use className="lotus" href="#pad" transform="translate(910,460) scale(0.6)" />
                <use className="lotus" href="#lotus2" transform="translate(190,512) scale(0.5)" />
                <use className="lotus" href="#lotus2" transform="translate(610,432) scale(0.42)" />
                <use className="lotus" href="#lotus2" transform="translate(852,448) scale(0.55)" />
              </g>
              <use className="lotus" href="#pad" transform="translate(150,572) scale(0.8)" />
              <use className="lotus" href="#pad" transform="translate(944,544) scale(0.85)" />
              <use className="lotus" href="#lotus2" transform="translate(916,532) scale(0.78)" />

              {/* Grass / water ripples */}
              <g fill="none" strokeLinecap="round">
                <path className="grass" d="M150 512 Q220 504 290 512 T430 512" stroke="#D7F0EA" strokeWidth="6" opacity="0.7" />
                <path className="grass" d="M660 500 Q730 492 800 500" stroke="#D7F0EA" strokeWidth="6" opacity="0.6" />
                <path className="grass" d="M140 672 Q236 662 332 672 T530 672" stroke="#8FD4E2" strokeWidth="7" opacity="0.6" />
                <path className="grass" d="M700 728 Q784 718 868 728 T1010 726" stroke="#6FB8DD" strokeWidth="7" opacity="0.6" />
                <path className="grass" d="M170 904 Q280 892 390 904 T610 904" stroke="#2A6CB0" strokeWidth="8" opacity="0.5" />
              </g>

              <g fill="none" stroke="#1f7ed2" strokeWidth="3" opacity="0.4">
                <ellipse className="ripple" cx="560" cy="692" rx="210" ry="24" />
                <ellipse className="ripple" cx="555" cy="700" rx="150" ry="17" />
                <ellipse className="ripple" cx="550" cy="708" rx="92" ry="11" />
              </g>

              <ellipse cx="560" cy="690" rx="150" ry="20" fill="#1B5E9E" opacity="0.22" />
              <path d="M470 690 Q540 700 610 690" stroke="#9BDCE8" strokeWidth="5" fill="none" opacity="0.6" strokeLinecap="round" />

              {/* Swan */}
              <g id="swan-pos" transform="translate(255,285) scale(0.55)">
                <g id="swan-flip" transform="translate(513,0) scale(-1,1) translate(-513,0)">
                  <g id="swan">
                    <ellipse cx="437" cy="760" rx="328" ry="31" fill="#0a3a82" opacity="0.16" />
                    <path d="M128 675 C216 620 328 586 474 606 C602 624 708 682 765 762 C610 796 364 795 194 744 C162 734 140 710 128 675 Z" fill="url(#deepBlue)" />
                    {/* Tail feathers */}
                    <g id="tail">
                      <path className="feather" d="M125 675 L292 686 L214 745 C176 734 144 711 125 675 Z" fill="#65bdff" />
                      <path className="feather" d="M170 606 L378 614 L300 705 C236 684 192 650 170 606 Z" fill="#2f8cff" />
                      <path className="feather" d="M230 552 L465 582 L348 674 C290 636 250 598 230 552 Z" fill="#4ca8ff" />
                      <path className="feather" d="M295 494 L555 568 L445 640 C370 602 322 552 295 494 Z" fill="#9bd7ff" />
                    </g>
                    {/* Resting wing */}
                    <g id="wing">
                      <path d="M235 570 C374 540 560 562 697 684 C608 750 426 758 290 710 C236 690 214 633 235 570 Z" fill="#1b79e9" />
                      <path d="M235 570 L473 582 L616 690 L300 706 Z" fill="#51aeff" />
                      <path d="M473 582 L697 684 L616 690 Z" fill="#1e73d7" />
                      <path d="M300 706 L616 690 L480 744 Z" fill="#0e53bf" />
                      <path d="M350 580 L500 530 C593 552 654 608 697 684 L473 582 Z" fill="#87ceff" />
                      <path d="M500 530 C575 544 641 585 697 684 L560 635 Z" fill="#3c9fff" />
                    </g>
                    {/* Raised wing (shown during flap) */}
                    <g id="raised-wing" opacity="0">
                      <path d="M420 704 C435 580 492 430 590 320 C626 466 600 614 538 722 Z" fill="#166bd1" />
                      <path d="M515 468 C635 370 774 328 910 350 C800 388 690 434 592 510 Z" fill="#9bd7ff" />
                      <path d="M490 540 C616 470 736 445 858 470 C754 506 646 545 548 608 Z" fill="#4aa9ff" />
                      <path d="M465 610 C586 555 704 538 818 568 C718 596 614 630 520 680 Z" fill="#197ee9" />
                    </g>
                    {/* Neck and head */}
                    <g id="neck-scale" transform="translate(690 752) scale(0.82) translate(-690 -752)">
                      <g id="neck-head">
                        <path d="M655 754 C724 673 711 585 652 492 C607 422 551 368 558 259 C565 139 661 94 746 132 C819 165 839 246 791 296 C758 330 696 336 635 301 C610 360 656 425 707 495 C781 597 846 704 770 787 C731 830 685 805 655 754 Z" fill="url(#swanNeck)" />
                        <g id="neck-facets" opacity="0.92">
                          <path d="M594 251 L635 178 L706 201 L635 301 Z" fill="#78c9ff" opacity="0.58" />
                          <path d="M635 178 L746 151 L708 201 Z" fill="#28a2f6" opacity="0.66" />
                          <path d="M708 201 L801 257 L791 296 L706 282 Z" fill="#0a4fb4" opacity="0.54" />
                          <path d="M635 301 L706 282 L690 374 L650 390 Z" fill="#a5ddff" opacity="0.46" />
                          <path d="M650 390 L690 374 L707 495 L665 500 Z" fill="#29a2ff" opacity="0.62" />
                          <path d="M610 360 L650 390 L665 500 L626 448 Z" fill="#7fd0ff" opacity="0.48" />
                          <path d="M665 500 L707 495 L762 604 L715 600 Z" fill="#074bb5" opacity="0.46" />
                          <path d="M626 448 L665 500 L715 600 L676 594 Z" fill="#55b9ff" opacity="0.56" />
                          <path d="M676 594 L715 600 L770 787 L703 735 Z" fill="#083f9d" opacity="0.48" />
                          <path d="M655 754 L676 594 L703 735 L685 805 Z" fill="#83d2ff" opacity="0.42" />
                          <path d="M703 735 L770 787 L720 823 L685 805 Z" fill="#064ab2" opacity="0.50" />
                        </g>
                        <path d="M594 251 C606 164 684 126 746 151 C791 169 812 213 801 257 C779 232 745 213 708 201 C662 186 624 201 594 251 Z" fill="#b5e5ff" opacity="0.28" />
                        {/* Beak */}
                        <g id="beak">
                          <path d="M735 224 C785 234 850 268 898 304 C910 313 903 325 888 322 C829 310 771 286 720 263 C711 248 716 231 735 224 Z" fill="url(#beakBlue)" />
                          <g clipPath="url(#beakClip)">
                            <polygon points="728,231 802,243 800,265 721,250" fill="#bfe4ff" opacity="0.9" />
                            <polygon points="802,243 861,261 859,287 800,265" fill="#8fcaff" opacity="0.85" />
                            <polygon points="861,261 900,303 897,313 859,287" fill="#5fb0ff" opacity="0.9" />
                            <polygon points="721,250 800,265 800,286 719,263" fill="#2f8ff0" opacity="0.9" />
                            <polygon points="800,265 859,287 859,308 800,286" fill="#1c74dc" opacity="0.9" />
                            <polygon points="859,287 897,313 889,322 859,308" fill="#0d52b8" opacity="0.92" />
                            <polyline points="721,250 800,265 859,287 897,313" fill="none" stroke="#0b4fae" strokeWidth="2" opacity="0.55" />
                          </g>
                          <path d="M735 224 C785 234 850 268 898 304 C910 313 903 325 888 322 C829 310 771 286 720 263 C711 248 716 231 735 224 Z" fill="none" stroke="#0a1b34" strokeWidth="4" strokeLinejoin="round" />
                          <path d="M884 306 C902 309 908 318 892 322 C895 316 893 311 884 306 Z" fill="#0a1b34" opacity="0.8" />
                          <ellipse cx="803" cy="262" rx="7" ry="4" transform="rotate(28 803 262)" fill="#071427" />
                        </g>
                        {/* Eye */}
                        <path d="M718 207 C745 209 768 222 744 240 C734 247 726 252 720 258 C712 250 704 242 700 232 C695 218 702 206 718 207 Z" fill="#101820" />
                        <circle cx="724" cy="207" r="8.5" fill="#07090e" />
                        <circle cx="720" cy="203" r="2.8" fill="#ffffff" opacity="0.95" />
                      </g>
                    </g>
                  </g>
                </g>
              </g>

              {/* Foreground lotus pads */}
              <use className="lotus" href="#pad" transform="translate(230,930) scale(1.25)" />
              <use className="lotus" href="#pad" transform="translate(610,968) scale(1.1)" />
              <use className="lotus" href="#lotus2" transform="translate(900,900) scale(1.2)" />
            </g>

            {/* Outer ring border */}
            <circle cx="500" cy="500" r="468" fill="none" stroke="#16324F" strokeWidth="9" />
          </svg>
        </section>
      </div>
    </div>
  );
}

export default SwanAnimation;
