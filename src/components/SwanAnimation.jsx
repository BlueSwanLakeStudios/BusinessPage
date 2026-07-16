import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

// The swan below is a machine-traced vector of the reference logo:
// the swan was segmented from the source image with OpenCV (HSV threshold on
// its saturated blues + the navy beak), its shading posterized to 9 kmeans
// color clusters, and every cluster region vectorized to simplified polygon
// paths. Silhouette IoU vs the reference: 0.907; mean color error inside the
// swan: ~3.5%. Paths are grouped for animation (body / neck / head) with
// overlapping seams so small rotations never open gaps.
// Placement mapping: reference-image pixel coords -> scene via
// translate(-114.4,-114.4) scale(1.2)   (global pivot = local*1.2 - 114.4)
//   neck base  (300,690) -> "246 714"
//   head joint (345,405) -> "300 372"
//   raisedWing (470,635) -> "450 648"
function SwanAnimation({ inline = false }) {
  const sceneRef = useRef(null);
  const stateRef = useRef("idle");
  const floatTLRef = useRef(null);
  const neckTLRef = useRef(null);
  const headTLRef = useRef(null);

  const setState = useCallback((next) => { stateRef.current = next; }, []);

  const idle = useCallback(() => {
    if (stateRef.current === "flap") return;
    setState("idle");
    const svg = sceneRef.current;
    gsap.to(svg.querySelector("#swan"), { y: 0, duration: 0.7, ease: "sine.out", onComplete: () => floatTLRef.current?.play() });
    gsap.to(svg.querySelector("#neck-head"), { rotation: 0, svgOrigin: "246 714", duration: 0.7, ease: "sine.out", onComplete: () => neckTLRef.current?.play() });
    gsap.to(svg.querySelector("#head"), { rotation: 0, svgOrigin: "300 372", duration: 0.7, ease: "sine.out", onComplete: () => headTLRef.current?.play() });
  }, [setState]);

  const alertState = useCallback(() => {
    if (stateRef.current === "flap") return;
    setState("alert");
    floatTLRef.current?.pause(); neckTLRef.current?.pause(); headTLRef.current?.pause();
    const svg = sceneRef.current;
    gsap.to(svg.querySelector("#swan"), { y: -20, duration: 0.45, ease: "power2.out" });
    gsap.to(svg.querySelector("#neck-head"), { rotation: 2.2, svgOrigin: "246 714", duration: 0.6, ease: "power2.out" });
    gsap.to(svg.querySelector("#head"), { rotation: 4, svgOrigin: "300 372", duration: 0.6, ease: "power2.out" });
  }, [setState]);

  // Flap: a far-side wing fan (behind the body, slightly darker) rises above
  // the back, beats a few times while body and head bob, then folds away.
  // The traced folded wing stays put, reading as the near-side wing.
  const flap = useCallback(() => {
    if (stateRef.current === "flap") return;
    setState("flap");
    floatTLRef.current?.pause(); neckTLRef.current?.pause(); headTLRef.current?.pause();
    const svg = sceneRef.current;
    const raisedWing = svg.querySelector("#raised-wing");
    const swan = svg.querySelector("#swan");
    const head = svg.querySelector("#head");
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(raisedWing, { opacity: 0, rotation: 0, scale: 1 });
        idle();
      },
    });
    tl.fromTo(
        raisedWing,
        { opacity: 0, rotation: -16, scale: 0.85, svgOrigin: "450 648" },
        { opacity: 1, rotation: 0, scale: 1, svgOrigin: "450 648", duration: 0.28, ease: "back.out(1.6)" },
        0
      )
      .to(raisedWing, { rotation: 14, svgOrigin: "450 648", duration: 0.18, ease: "power2.in" })
      .to(swan, { y: 6, duration: 0.18, ease: "power2.in" }, "<")
      .to(head, { rotation: 4, svgOrigin: "300 372", duration: 0.18, ease: "power2.in" }, "<")
      .to(raisedWing, { rotation: -12, svgOrigin: "450 648", duration: 0.22, ease: "power2.out" })
      .to(swan, { y: -14, duration: 0.22, ease: "power2.out" }, "<")
      .to(head, { rotation: -5, svgOrigin: "300 372", duration: 0.22, ease: "power2.out" }, "<")
      .to(raisedWing, { rotation: 10, svgOrigin: "450 648", duration: 0.2, ease: "sine.inOut" })
      .to(swan, { y: 2, duration: 0.2, ease: "sine.inOut" }, "<")
      .to(head, { rotation: 3, svgOrigin: "300 372", duration: 0.2, ease: "sine.inOut" }, "<")
      .to(raisedWing, { rotation: -3, svgOrigin: "450 648", duration: 0.18, ease: "power2.out" })
      .to(swan, { y: -8, duration: 0.18, ease: "power2.out" }, "<")
      .to(head, { rotation: -2, svgOrigin: "300 372", duration: 0.18, ease: "power2.out" }, "<")
      .to({}, { duration: 0.16 })
      .to(raisedWing, { opacity: 0, rotation: -16, scale: 0.86, svgOrigin: "450 648", duration: 0.24, ease: "power2.in" });
  }, [setState, idle]);

  useEffect(() => {
    const svg = sceneRef.current;
    if (!svg) return;
    floatTLRef.current = gsap.to(svg.querySelector("#swan"), { y: -13, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true });
    neckTLRef.current = gsap.to(svg.querySelector("#neck-head"), { rotation: 0.9, svgOrigin: "246 714", duration: 4.2, ease: "sine.inOut", repeat: -1, yoyo: true });
    headTLRef.current = gsap.to(svg.querySelector("#head"), { rotation: 1.8, svgOrigin: "300 372", duration: 3.4, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.5 });
    gsap.utils.toArray(svg.querySelectorAll(".ripple")).forEach((el, i) => {
      gsap.fromTo(el, { scale: 0.82, opacity: 0.5, transformOrigin: "50% 50%" }, { scale: 1.25, opacity: 0.02, duration: 3.8, repeat: -1, ease: "power1.out", delay: i * 1.1 });
    });
    gsap.utils.toArray(svg.querySelectorAll(".lotus")).forEach((el, i) => {
      gsap.to(el, { rotation: i % 2 ? -2.5 : 2.5, transformOrigin: "50% 100%", duration: 2.8 + i * 0.3, ease: "sine.inOut", repeat: -1, yoyo: true, delay: i * 0.3 });
    });
    gsap.utils.toArray(svg.querySelectorAll(".band")).forEach((el, i) => {
      gsap.to(el, { x: i % 2 ? 14 : -14, duration: 5 + i * 0.4, ease: "sine.inOut", repeat: -1, yoyo: true });
    });
    setState("idle");
    return () => {
      gsap.killTweensOf(svg.querySelectorAll("*"));
      floatTLRef.current?.kill(); neckTLRef.current?.kill(); headTLRef.current?.kill();
    };
  }, [setState]);

  const svgStage = (
    <section
      style={{
        width: "min(92vw, 480px)",
        aspectRatio: "1/1",
        borderRadius: "50%",
        background: "rgba(6,22,40,0.5)",
        boxShadow: "0 28px 90px rgba(0,0,0,0.42), inset 0 0 0 1px rgba(130,205,230,0.14)",
        overflow: "hidden",
      }}
    >
      <svg
        ref={sceneRef}
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
            <stop offset="0" stopColor="#f2edf0" /><stop offset="0.75" stopColor="#e0ebe8" /><stop offset="1" stopColor="#cde4dc" />
          </linearGradient>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#b9dcc6" /><stop offset="0.22" stopColor="#6dbcc4" /><stop offset="0.55" stopColor="#3b96b8" /><stop offset="1" stopColor="#2a7aa8" />
          </linearGradient>
          <filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="14" /></filter>
          <filter id="soft6" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6" /></filter>
          <clipPath id="circle-clip"><circle cx="500" cy="500" r="468" /></clipPath>
          <g id="padL"><path d="M0 0 L44 -9 A46 19 0 1 0 44 9 Z" fill="#9ed468" /><path d="M-6 0 L28 -6 A34 13 0 1 0 28 6 Z" fill="#c3e97d" opacity="0.7" /></g>
          <g id="padM"><path d="M0 0 L44 -9 A46 19 0 1 0 44 9 Z" fill="#64b37c" /><path d="M-6 0 L28 -6 A34 13 0 1 0 28 6 Z" fill="#8ccb8a" opacity="0.6" /></g>
          <g id="padD"><path d="M0 0 L44 -9 A46 19 0 1 0 44 9 Z" fill="#3f8a58" /><path d="M-6 0 L28 -6 A34 13 0 1 0 28 6 Z" fill="#5aa76b" opacity="0.6" /></g>
          <g id="lotusBig">
            <ellipse cx="0" cy="2" rx="40" ry="10" fill="#e88fa0" />
            <path d="M-40 0 Q-58 -20 -46 -44 Q-22 -32 -14 -8 Z" fill="#f2a4ac" />
            <path d="M40 0 Q58 -20 46 -44 Q22 -32 14 -8 Z" fill="#f2a4ac" />
            <path d="M-26 -4 Q-40 -38 -20 -62 Q-4 -40 -2 -8 Z" fill="#f6bdb4" />
            <path d="M26 -4 Q40 -38 20 -62 Q4 -40 2 -8 Z" fill="#f6bdb4" />
            <path d="M-12 -8 Q-22 -46 -4 -72 Q10 -46 8 -8 Z" fill="#f9d2c4" />
            <path d="M12 -8 Q24 -44 10 -68 Q0 -44 0 -10 Z" fill="#fbe3d6" />
            <path d="M0 -10 Q-8 -40 0 -60 Q8 -40 0 -10 Z" fill="#fdf0e6" />
            <ellipse cx="0" cy="-6" rx="7" ry="4" fill="#f0c66a" />
          </g>
          <g id="lotusFar">
            <ellipse cx="0" cy="1" rx="26" ry="7" fill="#eda3ae" />
            <path d="M-26 0 Q-34 -16 -24 -30 Q-10 -20 -8 -4 Z" fill="#f3b8b8" />
            <path d="M26 0 Q34 -16 24 -30 Q10 -20 8 -4 Z" fill="#f3b8b8" />
            <path d="M-10 -4 Q-16 -26 -4 -42 Q6 -26 6 -4 Z" fill="#f8d3c8" />
            <path d="M10 -6 Q14 -24 4 -38 Q-2 -24 -2 -6 Z" fill="#fbe6da" />
          </g>
        </defs>
        <g clipPath="url(#circle-clip)">
          <rect x="32" y="32" width="936" height="936" fill="url(#sky)" />
          <g opacity="0.7">
            <ellipse cx="330" cy="180" rx="120" ry="34" fill="#ffffff" filter="url(#soft)" />
            <ellipse cx="640" cy="130" rx="150" ry="38" fill="#ffffff" filter="url(#soft)" />
            <ellipse cx="760" cy="230" rx="110" ry="28" fill="#f2f6ff" filter="url(#soft)" />
          </g>
          <rect x="32" y="290" width="936" height="678" fill="url(#water)" />
          <g fill="none" strokeLinecap="round">
            <path className="band" d="M60 322 Q250 314 440 322 T830 320" stroke="#e4f2da" strokeWidth="7" opacity="0.6" />
            <path className="band" d="M160 352 Q360 344 560 352 T950 350" stroke="#bfe4c9" strokeWidth="6" opacity="0.5" />
            <path className="band" d="M60 408 Q260 400 460 408 T880 406" stroke="#8fd2c8" strokeWidth="7" opacity="0.45" />
            <path className="band" d="M420 465 Q580 457 740 465 T1000 463" stroke="#aadfd2" strokeWidth="6" opacity="0.4" />
            <path className="band" d="M40 555 Q220 547 400 555 T760 553" stroke="#57aebe" strokeWidth="8" opacity="0.5" />
            <path className="band" d="M540 638 Q700 630 860 638 T1060 636" stroke="#7cc6cb" strokeWidth="7" opacity="0.4" />
            <path className="band" d="M80 758 Q280 748 480 758 T900 756" stroke="#25789e" strokeWidth="9" opacity="0.55" />
            <path className="band" d="M180 878 Q380 868 580 878 T980 876" stroke="#20658e" strokeWidth="10" opacity="0.55" />
            <path className="band" d="M420 938 Q560 930 700 938" stroke="#7fc3c6" strokeWidth="8" opacity="0.35" />
          </g>
          <g opacity="0.65">
            <use href="#padM" transform="translate(150,315) scale(0.5)" />
            <use href="#padL" transform="translate(300,309) scale(0.42)" />
            <use href="#padM" transform="translate(560,313) scale(0.46)" />
            <use href="#padL" transform="translate(700,317) scale(0.5)" />
            <use href="#padM" transform="translate(880,311) scale(0.44)" />
            <use href="#lotusFar" transform="translate(230,297) scale(0.8)" />
            <use href="#lotusFar" transform="translate(420,289) scale(0.7)" />
            <use href="#lotusFar" transform="translate(640,293) scale(0.9)" />
            <use href="#lotusFar" transform="translate(820,299) scale(0.8)" />
          </g>
          <g opacity="0.9">
            <use className="lotus" href="#padL" transform="translate(600,470) scale(0.85)" />
            <use className="lotus" href="#padM" transform="translate(706,502) scale(0.95)" />
            <use className="lotus" href="#padD" transform="translate(806,542) scale(0.9)" />
            <use className="lotus" href="#padM" transform="translate(905,470) scale(0.8)" />
            <use className="lotus" href="#padL" transform="translate(130,430) scale(0.7)" />
            <use className="lotus" href="#padM" transform="translate(90,505) scale(0.85)" />
          </g>
          <use className="lotus" href="#lotusFar" transform="translate(575,390) scale(1.5)" />
          <use className="lotus" href="#lotusBig" transform="translate(848,442) scale(1.15)" />
          <use className="lotus" href="#lotusBig" transform="translate(662,562) scale(0.7)" />
          <g opacity="0.5" filter="url(#soft6)">
            <path d="M220 740 Q470 800 820 744 Q700 820 470 826 Q310 820 220 740 Z" fill="#1d78af" />
            <path d="M300 780 Q292 820 306 860 Q316 820 300 780 Z" fill="#2f8fc6" />
          </g>
          <g fill="none" stroke="#e7f6ee" strokeWidth="3" opacity="0.5">
            <ellipse className="ripple" cx="510" cy="756" rx="300" ry="26" />
            <ellipse className="ripple" cx="505" cy="768" rx="205" ry="18" />
            <ellipse className="ripple" cx="500" cy="780" rx="120" ry="12" />
          </g>
          <g id="swan-pos" transform="translate(-114.4 -114.4) scale(1.2)">
            <g id="swan">
              <g id="raised-wing" opacity="0">
                <path d="M430 640 L400 420 L480 620 Z" fill="#0aa4cf" />
                <path d="M460 630 L490 360 L530 626 Z" fill="#0092c8" />
                <path d="M495 630 L580 388 L580 636 Z" fill="#057cc0" />
                <path d="M525 640 L660 440 L620 652 Z" fill="#0055a8" />
              </g>
              <g id="bodyg">
                <path d="M829 588 L806 600 L794 599 L794 606 L790 611 L784 611 L784 615 L776 617 L771 624 L762 624 L757 618 L752 617 L752 613 L724 615 L724 609 L735 600 L735 595 L741 594 L741 588 L755 577 L742 581 L712 581 L711 573 L723 557 L721 553 L686 564 L675 564 L674 557 L680 555 L680 549 L670 550 L667 554 L654 553 L654 547 L663 537 L626 545 L625 538 L642 517 L579 545 L551 551 L550 542 L558 532 L556 529 L548 534 L548 539 L543 544 L533 543 L532 548 L518 551 L516 567 L512 568 L511 575 L497 578 L496 566 L487 567 L484 572 L472 574 L480 579 L478 591 L465 591 L464 580 L460 580 L447 591 L435 592 L435 621 L440 622 L440 629 L435 630 L434 649 L246 649 L248 677 L259 723 L266 729 L266 734 L275 735 L278 741 L286 743 L286 753 L302 753 L304 756 L319 758 L320 754 L326 754 L328 760 L390 761 L391 750 L408 754 L409 747 L415 747 L417 758 L426 761 L465 761 L485 744 L486 739 L494 736 L511 739 L512 749 L529 761 L645 761 L645 758 L638 754 L638 744 L655 741 L656 744 L709 745 L717 735 L728 735 L729 741 L734 741 L737 745 L737 751 L706 755 L706 761 L721 759 L724 755 L767 753 L769 756 L795 755 L796 761 L813 761 L813 752 L825 748 L826 744 L771 736 L771 728 L774 726 L808 723 L809 719 L795 716 L753 717 L745 713 L745 707 L764 689 L778 682 Z" fill="#0f8fd4"/>
                <path d="M800 749 L805 748 L810 753 L810 749 L819 750 L817 748 L823 744 L805 740 L806 743 L802 743 Z" fill="#00a4dd"/>
                <path d="M742 713 L743 718 L756 720 L750 723 L754 726 L801 723 L800 720 L789 717 L753 717 L746 714 L745 710 Z" fill="#00a4dd"/>
                <path d="M578 694 L607 728 L613 731 Z" fill="#00a4dd"/>
                <path d="M281 649 L271 649 L271 656 L268 658 L265 655 L256 657 L273 663 Z" fill="#00a4dd"/>
                <path d="M634 644 L636 652 L645 662 L679 675 L690 675 L719 652 Z" fill="#00a4dd"/>
                <path d="M639 637 L719 635 L740 618 L743 619 L743 624 L747 624 L746 616 L656 609 L639 632 Z" fill="#00a4dd"/>
                <path d="M829 589 L826 593 L821 592 L817 597 L809 599 L760 635 L756 633 L761 624 L749 622 L758 627 L742 645 L752 646 L738 648 L732 660 L749 666 L752 670 L766 672 L766 677 L724 666 L712 681 L708 702 L703 705 L704 710 L699 711 L702 714 L695 715 L693 719 L720 710 L726 703 L735 703 L778 682 L798 643 L751 645 L800 640 Z" fill="#00a4dd"/>
                <path d="M656 585 L637 604 L630 605 L545 604 L503 600 L542 586 L541 584 L454 614 L435 633 L435 637 L455 619 L466 634 L490 645 L498 641 L502 650 L558 680 L560 686 L596 658 Z" fill="#00a4dd"/>
                <path d="M528 560 L512 576 L478 591 L435 593 L442 593 L442 600 L446 600 L447 604 L454 604 L457 599 L448 599 L446 593 L462 593 L465 597 L512 578 Z" fill="#00a4dd"/>
                <path d="M687 675 L612 674 L617 677 L602 678 L597 688 L599 692 L593 695 L590 703 L575 687 L568 684 L568 689 L562 695 L546 702 L549 707 L541 706 L537 712 L532 713 L532 719 L528 717 L525 724 L510 730 L502 738 L552 740 L512 736 L559 707 L576 692 L619 736 L591 739 L618 739 L645 761 L637 749 L632 749 L631 744 L620 740 L619 734 L661 696 L679 685 Z" fill="#005fbd"/>
                <path d="M419 650 L401 649 L406 654 L402 655 L396 649 L401 656 L372 668 L340 748 L344 726 L342 722 L334 754 L275 667 L328 673 L350 679 L353 683 L356 658 L361 649 L356 655 L349 655 L353 659 L348 659 L346 663 L343 661 L338 667 L335 662 L312 658 L324 666 L335 667 L328 670 L285 664 L297 660 L272 663 L249 655 L269 664 L260 667 L258 663 L250 661 L255 665 L251 669 L253 684 L256 680 L258 685 L254 701 L259 723 L264 726 L269 671 L272 667 L317 735 L316 740 L320 740 L333 758 L344 757 L341 753 L368 687 L372 688 L380 697 L376 738 L380 746 L364 752 L384 748 L379 736 L389 688 Z" fill="#005fbd"/>
                <path d="M800 640 L737 645 L744 633 L740 618 L717 635 L679 636 L678 639 L639 637 L656 639 L656 643 L618 642 L610 654 L596 666 L593 674 L610 676 L608 672 L628 644 L708 650 L703 647 L733 626 L725 644 L731 648 L719 656 L720 662 L713 662 L701 675 L702 687 L697 687 L699 690 L655 735 L658 738 L705 718 L710 722 L712 715 L764 689 L674 728 L697 698 L712 687 L711 678 L715 677 L720 665 L736 668 L728 662 L737 649 L791 644 Z" fill="#005fbd"/>
                <path d="M656 608 L643 608 L621 638 L637 639 Z" fill="#005fbd"/>
                <path d="M518 582 L512 576 L442 608 L435 614 L504 582 Z" fill="#005fbd"/>
                <path d="M650 601 L651 604 L661 605 L659 610 L667 610 L664 607 L670 606 L671 611 L720 614 L731 602 L707 602 L702 605 L679 603 L678 606 L662 603 L661 598 L671 582 L679 581 L664 579 L672 568 L661 578 L665 581 Z" fill="#005fbd"/>
                <path d="M723 554 L676 568 L688 566 L696 574 L701 574 L701 579 L708 579 Z" fill="#005fbd"/>
                <path d="M544 561 L560 557 L574 549 L561 554 L560 550 L550 553 L548 549 Z" fill="#005fbd"/>
                <path d="M663 537 L618 550 L642 519 L640 518 L577 549 L593 545 L583 553 L583 560 L589 552 L591 557 L622 552 L630 556 L626 558 L629 560 L652 552 Z" fill="#005fbd"/>
                <path d="M406 739 L426 761 L465 761 L485 744 L485 739 L448 739 L445 745 L440 743 L440 739 L422 739 L421 745 L416 742 L418 739 Z" fill="#0049ac"/>
                <path d="M577 689 L567 679 L556 694 L553 690 L540 700 L542 705 L536 703 L528 715 L523 713 L526 716 L520 722 L516 722 L521 716 L509 724 L512 727 L510 729 L505 727 L502 738 L508 739 L505 737 L512 731 L516 732 L545 710 L559 704 L561 698 L564 700 L561 697 L570 689 Z" fill="#0049ac"/>
                <path d="M417 652 L411 649 L373 649 L376 655 L374 661 L369 650 L365 649 L348 722 L345 723 L344 717 L346 727 L342 725 L334 756 L274 666 L333 670 L334 673 L348 672 L346 676 L352 676 L353 684 L362 649 L355 656 L276 662 L273 666 L270 662 L248 655 L248 677 L257 714 L264 713 L264 718 L259 723 L266 730 L296 745 L326 754 L335 761 L387 760 L387 753 L383 748 L386 744 L407 754 L395 723 L391 702 L394 693 L389 693 L392 687 L388 685 L377 738 L382 746 L339 755 L373 670 L410 655 L392 673 L390 681 L393 681 Z" fill="#0049ac"/>
                <path d="M763 690 L708 716 L660 734 L668 729 L669 724 L681 715 L683 708 L699 692 L710 686 L702 678 L715 663 L726 665 L723 660 L726 659 L726 653 L739 648 L728 645 L736 630 L734 623 L712 638 L699 637 L708 641 L701 646 L703 649 L710 640 L720 635 L719 647 L722 648 L712 656 L714 661 L701 665 L703 670 L697 674 L693 688 L682 686 L674 697 L653 713 L656 716 L685 700 L663 716 L659 723 L656 722 L638 735 L635 747 L632 746 L631 749 L619 740 L614 745 L609 745 L608 742 L567 742 L555 745 L517 743 L512 749 L529 761 L645 761 L635 751 L635 747 L648 741 L671 745 L711 744 L717 735 L722 735 L744 713 L738 712 L724 724 L728 708 L745 709 Z" fill="#0049ac"/>
                <path d="M528 589 L520 585 L514 574 L512 578 L435 614 L450 608 L458 611 L453 613 L455 615 L472 609 L460 609 L479 603 L474 606 L476 608 Z" fill="#0049ac"/>
                <path d="M695 565 L682 565 L677 569 L671 567 L676 570 L671 572 L672 576 L660 580 L656 590 L650 591 L650 597 L645 597 L646 604 L652 606 L636 607 L630 615 L633 618 L631 621 L626 620 L627 625 L622 625 L615 633 L620 634 L620 639 L628 641 L613 643 L595 663 L592 660 L595 663 L588 669 L588 674 L595 676 L580 683 L580 695 L610 726 L612 724 L592 702 L598 694 L656 698 L648 707 L650 709 L668 692 L659 695 L657 699 L656 695 L601 691 L599 689 L607 680 L677 679 L688 675 L614 675 L595 671 L609 659 L620 643 L653 642 L667 645 L665 640 L692 640 L692 637 L633 638 L626 637 L625 633 L631 630 L645 609 L672 610 L681 606 L708 606 L704 603 L664 605 L653 602 L667 581 L709 577 L698 573 L693 568 Z" fill="#0049ac"/>
                <path d="M640 520 L554 557 L546 551 L551 537 L546 542 L547 549 L536 558 L532 555 L528 560 L534 557 L546 564 L560 558 L560 575 L555 580 L578 571 L634 558 L636 550 L631 548 L599 555 L592 553 L597 549 L600 552 L600 546 L604 542 L610 541 L613 546 L620 545 L617 541 L620 538 L615 538 L617 534 L626 533 L623 538 L625 540 Z" fill="#0049ac"/>
                <path d="M621 729 L617 732 L613 727 L616 724 L613 727 L601 715 L596 717 L592 712 L596 709 L572 688 L574 692 L511 734 L508 739 L592 739 L593 732 L597 736 L605 735 L599 723 L602 726 L605 723 L613 731 L607 738 L613 738 L614 733 L620 738 L618 733 Z" fill="#0079cf"/>
                <path d="M374 687 L366 686 L339 756 L382 747 L378 740 L381 695 Z" fill="#0079cf"/>
                <path d="M600 691 L665 695 L678 682 L606 682 Z" fill="#0079cf"/>
                <path d="M250 655 L273 665 L330 753 L336 756 L352 678 L278 664 L358 656 L361 649 L281 649 L272 662 Z" fill="#0079cf"/>
                <path d="M490 647 L491 655 L498 655 L508 663 L514 659 L513 655 Z" fill="#0079cf"/>
                <path d="M607 670 L607 675 L656 675 L651 671 L648 673 L639 670 L637 662 L632 661 L630 657 L633 654 L629 649 L632 642 L626 643 Z" fill="#0079cf"/>
                <path d="M456 619 L441 631 L435 632 L437 636 L434 649 L425 649 L421 653 L421 649 L409 649 L417 653 L389 683 L407 740 L464 739 L459 733 L465 734 L466 727 L470 727 L471 732 L477 731 L491 739 L506 729 L504 727 L498 730 L489 690 L468 639 Z" fill="#0079cf"/>
                <path d="M757 625 L744 623 L744 617 L735 620 L743 627 L741 636 L734 642 L737 647 L726 664 L716 663 L713 666 L716 670 L714 674 L711 673 L711 685 L696 696 L669 732 L750 697 L748 695 L726 703 L715 711 L678 725 L701 695 L714 687 L712 682 L725 666 L777 682 L734 664 L731 659 L741 646 L748 648 L748 644 L743 643 L757 630 Z" fill="#0079cf"/>
                <path d="M660 608 L650 609 L635 635 L636 639 L640 639 L640 633 Z" fill="#0079cf"/>
                <path d="M682 579 L666 582 L666 590 L655 601 L663 604 Z" fill="#0079cf"/>
                <path d="M829 588 L806 600 L794 599 L791 610 L784 611 L784 615 L776 617 L771 624 L762 624 L752 617 L752 613 L725 616 L724 610 L719 614 L720 619 L710 618 L708 622 L723 629 L726 628 L727 618 L735 621 L743 616 L744 623 L760 626 L746 642 L755 637 L756 643 L763 643 L759 636 L795 614 L799 617 L802 629 L799 632 L801 639 L803 627 L808 626 L814 615 L808 615 L807 622 L802 623 L802 613 L795 613 L801 607 L807 610 L803 607 L811 600 L823 601 Z" fill="#0db9e5"/>
                <path d="M755 577 L742 581 L712 581 L710 575 L706 579 L681 580 L666 600 L672 603 L734 601 L735 595 L741 594 L741 588 Z" fill="#0db9e5"/>
                <path d="M680 549 L670 550 L667 554 L655 554 L653 549 L647 555 L567 575 L461 612 L456 617 L511 601 L543 605 L639 605 L671 568 L680 565 L674 563 L674 557 L680 555 Z" fill="#0db9e5"/>
                <path d="M558 529 L548 534 L548 539 L543 544 L533 543 L532 548 L518 551 L516 567 L512 568 L511 575 L497 578 L496 566 L487 567 L484 572 L472 574 L480 579 L478 591 L465 591 L464 580 L460 580 L447 591 L441 592 L477 593 L513 577 Z" fill="#0db9e5"/>
                <path d="M640 517 L600 537 L569 548 L579 548 L639 520 Z" fill="#0db9e5"/>
                <path d="M706 761 L721 759 L724 755 L751 755 L755 752 L767 753 L769 756 L799 755 L823 749 L826 744 L821 743 L820 747 L806 751 L796 747 L799 745 L798 741 L819 743 L772 737 L771 732 L756 730 L808 723 L810 720 L807 718 L754 718 L742 712 L722 733 L738 738 L729 740 L735 742 L737 751 L706 755 Z" fill="#037fa8"/>
                <path d="M780 740 L795 742 L795 745 L789 745 L788 748 L802 752 L822 748 L822 743 L813 741 L815 746 L811 748 L806 746 L811 741 Z" fill="#068ed7"/>
                <path d="M493 735 L480 733 L479 729 L483 725 L479 729 L473 725 L463 726 L461 731 L454 731 L453 734 L451 729 L446 730 L445 735 L439 732 L432 738 L491 739 Z" fill="#068ed7"/>
                <path d="M575 691 L575 697 L585 708 L582 711 L586 713 L583 721 L592 721 L602 733 L598 734 L589 727 L590 734 L581 736 L619 738 L603 717 Z" fill="#068ed7"/>
                <path d="M427 649 L414 649 L418 651 L416 656 L390 683 L407 739 L412 736 L408 735 L394 686 Z" fill="#068ed7"/>
                <path d="M246 655 L274 663 L279 662 L277 658 L283 649 L279 650 L272 661 L268 660 L272 658 L273 649 L246 649 Z" fill="#068ed7"/>
                <path d="M621 654 L629 659 L627 662 L639 674 L691 675 L707 662 L705 660 L689 673 L678 673 L666 669 L665 665 L662 668 L643 657 L645 652 L641 654 L635 646 L640 643 L628 643 L625 647 L627 650 Z" fill="#068ed7"/>
                <path d="M760 625 L747 623 L754 630 L731 655 L732 665 L722 666 L711 680 L712 686 L700 693 L673 730 L760 692 L758 690 L730 703 L723 693 L715 692 L713 695 L714 681 L726 667 L773 683 L762 690 L778 682 L779 679 L773 673 L753 668 L733 658 Z" fill="#068ed7"/>
                <path d="M657 609 L647 619 L636 638 L671 638 L640 635 L648 632 L647 625 Z" fill="#068ed7"/>
                <path d="M435 636 L436 640 L454 621 L458 623 L487 691 L494 714 L490 722 L494 723 L496 734 L590 664 L588 662 L562 682 L527 659 L507 650 L503 640 L496 639 L492 644 L465 631 L455 616 L470 609 L453 614 Z" fill="#068ed7"/>
                <path d="M640 604 L634 608 L607 605 L524 605 L522 608 L518 607 L518 611 L526 608 L524 612 L527 613 L523 616 L534 616 L539 621 L537 625 L544 625 L538 620 L538 615 L541 616 L540 619 L556 614 L570 614 L572 618 L575 615 L589 616 L591 624 L594 622 L598 627 L608 627 L610 630 L614 630 L613 623 L622 620 L620 627 L606 642 L597 640 L597 643 L603 644 L604 649 Z" fill="#068ed7"/>
                <path d="M486 588 L466 595 L465 592 L435 592 L435 613 Z" fill="#068ed7"/>
                <path d="M688 579 L677 580 L662 604 L695 604 L665 601 L681 581 Z" fill="#068ed7"/>
                <path d="M264 727 L266 734 L275 735 L278 741 L287 744 L286 753 L302 753 L316 758 L320 754 L326 754 L328 760 L344 759 L299 744 Z" fill="#00368e"/>
                <path d="M763 690 L727 706 L717 735 L721 735 L735 718 L745 712 L745 707 Z" fill="#00368e"/>
                <path d="M388 687 L386 704 L390 702 L397 736 L404 750 L379 739 L383 746 L376 751 L385 753 L383 761 L390 761 L391 750 L408 754 L408 748 L416 745 L469 747 L470 744 L479 742 L408 740 L392 688 Z" fill="#00368e"/>
                <path d="M697 690 L695 684 L686 686 L694 691 L666 707 L665 704 L683 691 L681 680 L647 709 L653 710 L656 724 L639 734 L635 744 L627 746 L620 740 L619 732 L618 738 L511 739 L512 747 L519 744 L557 746 L606 743 L609 747 L623 747 L623 752 L629 750 L633 754 L642 737 L691 699 Z" fill="#00368e"/>
                <path d="M569 679 L495 736 L502 737 L567 687 Z" fill="#00368e"/>
                <path d="M375 649 L360 649 L356 656 L338 750 L349 724 L367 651 L374 666 L377 666 Z" fill="#00368e"/>
                <path d="M724 633 L714 637 L720 639 L717 650 L720 651 L690 674 L695 675 L696 680 L710 664 L717 661 L718 656 L729 649 L722 645 Z" fill="#00368e"/>
                <path d="M517 590 L494 597 L486 595 L494 588 L497 589 L492 586 L475 594 L470 604 L457 603 L445 609 L451 609 L453 616 L515 594 Z" fill="#00368e"/>
                <path d="M680 567 L671 568 L603 649 L581 669 L588 671 L588 678 L579 687 L573 688 L589 704 L591 702 L583 693 L597 693 L597 690 L582 683 L587 679 L601 677 L589 671 L617 643 L629 643 L630 639 L621 637 L624 630 L642 608 L658 608 L649 602 L665 581 L677 578 L674 573 Z" fill="#00368e"/>
                <path d="M551 538 L530 559 L544 564 L548 571 L554 572 L554 579 L571 574 L573 569 L564 569 L562 560 L580 549 L542 563 L550 550 Z" fill="#00368e"/>
              </g>
              <g id="neck-head">
                <g id="neck">
                <path d="M235 469 L244 470 L303 425 L337 408 L263 408 L264 420 L260 429 L240 455 L240 463 Z" fill="#0f8fd4"/>
                <path d="M405 361 L401 361 L400 370 L394 370 L394 407 L385 408 L388 424 L387 441 L379 442 L376 438 L360 483 L309 563 L246 649 L247 667 L447 667 L447 619 L441 617 L441 611 L447 609 L447 591 L433 592 L423 597 L376 632 L368 631 L395 552 L419 495 L432 442 L426 390 L423 384 L417 382 L415 374 L406 367 Z" fill="#0f8fd4"/>
                <path d="M446 623 L406 667 L410 667 L447 627 Z" fill="#00a4dd"/>
                <path d="M416 442 L391 447 L368 497 L335 550 L322 560 L318 556 L317 559 L321 560 L314 565 L309 564 L312 560 L310 558 L246 649 L246 654 L252 655 L261 646 L264 638 L261 641 L259 636 L266 631 L270 622 L277 627 L271 656 L256 657 L270 663 L275 661 L331 565 L356 581 L401 505 L402 497 L398 493 L402 482 L408 481 L412 473 L413 459 L418 456 Z" fill="#00a4dd"/>
                <path d="M262 423 L261 431 L256 432 L262 439 L246 464 L236 467 L246 468 L268 435 L263 432 Z" fill="#00a4dd"/>
                <path d="M394 371 L394 374 L402 378 L403 414 L400 418 L424 437 L422 441 L428 441 L431 446 L426 390 L413 380 L408 380 L407 383 L404 375 Z" fill="#00a4dd"/>
                <path d="M249 655 L269 664 L262 667 L302 667 L285 664 L297 660 L272 663 Z" fill="#005fbd"/>
                <path d="M447 607 L417 618 L418 607 L422 607 L418 601 L386 625 L385 630 L383 627 L367 637 L363 634 L367 631 L361 632 L361 646 L368 639 L372 643 L393 647 L402 655 L377 667 L406 667 L424 646 L418 650 L417 647 L399 647 L399 644 L385 644 L371 639 L432 616 Z" fill="#005fbd"/>
                <path d="M389 423 L390 446 L365 497 L358 502 L356 490 L353 491 L320 543 L313 560 L342 528 L339 538 L341 541 L366 501 L393 446 Z" fill="#005fbd"/>
                <path d="M296 421 L286 408 L278 408 L274 415 L265 414 L263 432 L269 430 L275 419 L290 429 L296 425 Z" fill="#005fbd"/>
                <path d="M363 645 L355 656 L331 657 L330 660 L319 658 L276 662 L273 666 L270 662 L248 655 L247 667 L340 667 L351 660 L356 667 Z" fill="#0049ac"/>
                <path d="M447 607 L390 631 L365 638 L363 642 L366 640 L373 644 L376 659 L373 660 L366 648 L361 667 L380 667 L410 655 L401 666 L405 667 L416 656 L416 650 L372 640 L438 614 Z" fill="#0049ac"/>
                <path d="M378 439 L375 440 L375 445 L380 447 L379 450 L382 448 L383 453 L378 458 L372 450 L364 476 L350 497 L356 497 L356 505 L362 504 L391 448 L391 445 L379 442 Z" fill="#0049ac"/>
                <path d="M447 667 L447 627 L437 630 L430 643 L429 641 L417 649 L375 641 L415 650 L417 653 L404 667 L408 664 L409 667 Z" fill="#0079cf"/>
                <path d="M398 616 L374 635 L400 627 L393 626 Z" fill="#0079cf"/>
                <path d="M424 598 L400 615 L405 615 L407 619 L402 626 L406 622 L430 616 L423 614 Z" fill="#0079cf"/>
                <path d="M412 504 L406 503 L404 506 L409 513 L405 521 L400 513 L395 515 L355 582 L335 567 L329 566 L275 661 L253 655 L250 657 L272 664 L273 667 L291 667 L278 664 L358 656 L395 552 L411 516 Z" fill="#0079cf"/>
                <path d="M387 457 L356 513 L345 519 L321 549 L324 537 L308 566 L312 565 L336 535 L338 538 L334 541 L334 549 L341 543 L368 499 Z" fill="#0079cf"/>
                <path d="M286 409 L284 412 L290 420 L288 423 L283 423 L278 417 L279 414 L282 416 L280 410 L265 431 L264 420 L262 422 L263 434 L267 435 L259 448 L261 452 L255 459 L295 425 Z" fill="#0079cf"/>
                <path d="M303 422 L305 425 L336 408 L318 411 L317 408 L307 408 Z" fill="#0079cf"/>
                <path d="M402 376 L394 383 L394 388 L398 383 L400 385 L394 394 L394 407 L386 408 L391 447 L415 442 L421 436 L421 433 L407 426 L400 417 L404 414 Z" fill="#0079cf"/>
                <path d="M302 408 L285 408 L295 424 L247 468 L302 427 Z" fill="#09111f"/>
                <path d="M334 555 L328 562 L300 572 L304 577 L297 577 L299 586 L293 591 L294 597 L306 600 L301 593 L313 593 L310 590 L313 586 L318 586 Z" fill="#0db9e5"/>
                <path d="M261 428 L240 455 L237 466 L248 465 L265 438 Z" fill="#0db9e5"/>
                <path d="M401 361 L401 369 L394 370 L394 373 L405 380 L407 394 L404 395 L404 400 L409 396 L409 382 L417 385 L412 396 L415 407 L411 411 L408 402 L407 419 L410 425 L418 427 L424 415 L430 419 L426 390 L406 367 L405 361 Z" fill="#0db9e5"/>
                <path d="M447 621 L440 627 L439 633 L421 648 L392 643 L386 645 L417 650 L416 656 L405 666 L411 667 L447 628 Z" fill="#068ed7"/>
                <path d="M447 592 L433 592 L423 597 L422 616 L447 608 Z" fill="#068ed7"/>
                <path d="M275 422 L265 432 L262 422 L264 438 L250 461 L269 448 L267 446 L264 449 L262 446 Z" fill="#068ed7"/>
                <path d="M405 412 L390 408 L403 422 L404 429 L411 429 L417 434 L416 439 L406 439 L390 447 L367 497 L341 539 L339 532 L335 533 L318 554 L319 544 L306 566 L311 568 L331 558 L372 496 L392 449 L414 444 L417 446 L417 454 L411 457 L408 477 L399 481 L401 484 L397 487 L397 495 L390 495 L393 499 L399 497 L400 503 L359 574 L353 579 L329 564 L274 659 L268 660 L272 658 L284 608 L274 615 L273 622 L270 617 L272 614 L253 640 L254 644 L246 649 L247 656 L269 663 L279 662 L277 658 L320 585 L328 577 L328 571 L333 568 L357 584 L384 538 L391 534 L392 525 L399 520 L402 523 L408 521 L419 495 L431 441 L402 417 Z" fill="#068ed7"/>
                <path d="M383 634 L372 637 L369 641 L364 639 L356 656 L355 667 L362 667 L367 651 L374 666 L377 666 L378 656 L373 647 L375 641 L383 642 Z" fill="#00368e"/>
                <path d="M447 619 L443 619 L441 611 L412 623 L422 622 L432 627 L433 621 L439 621 L441 628 Z" fill="#00368e"/>
                <path d="M389 430 L386 442 L379 442 L376 438 L361 480 L368 480 L368 471 L373 471 L377 462 L386 457 L387 447 L391 446 Z" fill="#00368e"/>
                </g>
                <g id="head">
                <path d="M401 361 L401 369 L392 370 L384 367 L383 363 L368 359 L358 350 L357 341 L352 338 L350 332 L337 336 L326 345 L320 345 L316 340 L316 349 L303 357 L289 357 L287 348 L283 348 L269 368 L268 375 L264 376 L259 391 L256 392 L264 409 L264 420 L257 431 L296 431 L339 407 L347 399 L357 374 L364 375 L364 388 L368 393 L384 400 L388 431 L401 431 Z" fill="#0f8fd4"/>
                <path d="M361 359 L351 370 L344 364 L346 358 L338 360 L340 371 L345 372 L340 378 L335 372 L336 367 L332 369 L325 365 L327 353 L336 350 L335 343 L332 345 L333 350 L323 347 L300 358 L289 360 L285 357 L274 374 L261 384 L259 391 L288 387 L295 383 L299 374 L306 371 L312 374 L318 384 L316 386 L313 383 L310 388 L303 390 L303 396 L323 401 L358 368 Z" fill="#00a4dd"/>
                <path d="M296 421 L280 405 L274 415 L265 414 L263 431 L268 431 L275 419 L290 429 L296 425 Z" fill="#005fbd"/>
                <path d="M313 414 L320 414 L321 411 L327 413 L337 407 L322 402 Z" fill="#005fbd"/>
                <path d="M360 362 L356 374 L362 364 L375 387 L375 393 L384 400 L388 421 L386 404 L390 401 L394 403 L394 395 L401 395 L401 378 L385 399 L364 362 Z" fill="#005fbd"/>
                <path d="M361 361 L365 390 L382 398 Z" fill="#0049ac"/>
                <path d="M295 423 L286 409 L284 412 L290 420 L283 423 L278 417 L279 414 L282 416 L278 410 L266 431 L289 431 Z" fill="#0079cf"/>
                <path d="M401 376 L384 397 L374 380 L374 375 L379 375 L376 371 L384 373 L384 367 L375 371 L373 363 L367 365 L362 361 L357 370 L340 383 L326 400 L303 398 L307 406 L303 422 L305 425 L344 403 L362 363 L385 401 L389 431 L401 431 L401 418 L398 415 L401 414 Z" fill="#0079cf"/>
                <path d="M308 371 L299 373 L295 382 L286 387 L256 392 L265 414 L276 414 L283 406 L295 422 L289 431 L296 431 L303 425 L303 392 L314 384 L314 377 Z" fill="#09111f"/>
                <path d="M401 361 L401 369 L392 370 L384 367 L383 363 L368 359 L358 350 L357 341 L347 332 L326 345 L320 345 L316 340 L316 349 L303 357 L289 357 L287 348 L283 348 L269 368 L268 375 L264 376 L259 390 L287 361 L308 357 L325 348 L327 350 L321 368 L325 374 L316 376 L312 392 L320 399 L329 395 L360 361 L376 364 L399 375 Z" fill="#0db9e5"/>
                <path d="M315 377 L311 371 L303 370 L286 386 L258 392 L287 388 L294 385 L303 372 L307 372 L313 382 L302 390 L304 396 L305 391 L314 387 Z" fill="#037fa8"/>
                <path d="M277 376 L264 383 L262 389 L271 391 L273 387 L280 388 Z" fill="#068ed7"/>
                <path d="M360 364 L323 399 L302 395 L302 417 L307 414 L309 400 L311 404 L314 400 L330 402 L329 398 L337 395 L332 404 L342 405 L351 390 L349 378 L351 376 L354 381 Z" fill="#068ed7"/>
                <path d="M361 359 L360 362 L385 400 L401 375 Z" fill="#068ed7"/>
                  <circle cx="306" cy="375" r="3.2" fill="#ffffff" opacity="0.95" />
                </g>
              </g>
            </g>
          </g>
          <use className="lotus" href="#padD" transform="translate(560,930) scale(1.5)" />
          <use className="lotus" href="#padM" transform="translate(690,880) scale(1.25)" />
          <use className="lotus" href="#padD" transform="translate(360,955) scale(1.3)" />
          <use className="lotus" href="#padM" transform="translate(180,900) scale(1.1)" />
        </g>
        <circle cx="500" cy="500" r="468" fill="none" stroke="#16324F" strokeWidth="9" />
      </svg>
    </section>
  );

  if (inline) return svgStage;

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "radial-gradient(circle at 50% 18%, rgba(95,188,211,0.18), transparent 38%), linear-gradient(180deg,#0a1c30,#123048)", overflow: "hidden" }}>
      <style>{`
        #swan, #neck-head, #neck, #head, #raised-wing, .lotus, .ripple, .band {
          transform-box: fill-box; transform-origin: center;
        }
      `}</style>
      <div style={{ width: "min(94vw,980px)", display: "grid", gap: 18, justifyItems: "center" }}>
        <div style={{ fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", opacity: 0.78, color: "#d4ecf5" }}>
          Blue Swan · Lotus Lake · Rive-Style
        </div>
        {svgStage}
      </div>
    </div>
  );
}

export default SwanAnimation;