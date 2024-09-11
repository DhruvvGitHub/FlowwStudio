function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
loco()



var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});







var heads = document.querySelectorAll(".heads h1");
heads.forEach(head => {
  var headText = head.textContent;
  var splittedText = headText.split("");
  var clutter = "";

  splittedText.forEach(function (char) {
    if (char === " ") {
      clutter += `<span class="animated-char">&nbsp;</span>`;
    } else {
      clutter += `<span class="animated-char">${char}</span>`;
    }
  });

  head.innerHTML = clutter;
});







function loader() {
  var tl = gsap.timeline()

  tl
  .from("#page1", {
    y: 2000,
    duration: 1,
    delay: 0.5
  })
  .to("#loader", {
    display: "none"
  })
  .from("#page1 #content #heading h1 span", {
    y: 700,
    stagger: 0.1
  })
  .from("#page1 .emoji", {
    width: 0,
    height: 0,
    delay: -0.5,
    duration: 0.7
  })
  .from("#page1 .emoji .eyes", {
    opacity: 0
  },"a")
  .from("#page1 .emoji .mouth-wrapper", {
    opacity: 0
  },"a")
  .from("#page1 #content #rotating-img", {
    width: 0,
    height: 0
  },"b")
  .from("#page1 #content #rotating-img h3", {
    opacity: 0
  },"b")
  .from("#page1 #content h5", {
    opacity: 0
  },"b")
}
loader()



function page1ScrollAnimation() {
  if (window.innerWidth >= 600) {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#page2",
        scroller: "#main",
        start: "-15% 50%",
        end: "50% 50%",
        scrub: true,
        // markers: true (optional for debugging)
      }
    });

    tl
      .from("#page2", {
        rotate: "7deg",
        scale: 0.8
      }, "a")
      .from("#page2 #swiper-slide1", {
        y: 400
      }, "a")
      .from("#page2 #swiper-slide2", {
        y: 500
      }, "a")
      .from("#page2 #swiper-slide3", {
        y: 600
      }, "a");
  } else {
    // Optional: Handle animations differently for smaller screens
    console.log("Animation disabled on smaller screens");
  }
}
// Call the function on page load or after potential DOM manipulation
page1ScrollAnimation();




function page1MouseFollower() {
  const wrapper = document.querySelector("#page1 .tracker");
  const emoji = document.querySelector("#page1 .emoji");
  const emojiFace = document.querySelector("#page1 .emoji-face");

  let isEnabled = false;

  // Enable the mouse events after 4 seconds
  setTimeout(() => {
    isEnabled = true;
  }, 4500);

  const moveEvent = (e) => {
    if (!isEnabled) return; // Do nothing if not enabled

    const wrapperRect = wrapper.getBoundingClientRect();

    const relX = e.clientX - (wrapperRect.left + wrapperRect.width / 2);
    const relY = e.clientY - (wrapperRect.top + wrapperRect.height / 2);

    const emojiMaxDisplacement = 100;
    const emojiFaceMaxDisplacement = 125;

    const emojiDisplacementX = (relX / wrapperRect.width) * emojiMaxDisplacement;
    const emojiDisplacementY = (relY / wrapperRect.height) * emojiMaxDisplacement;

    const emojiFaceDisplacementX = (relX / wrapperRect.width) * emojiFaceMaxDisplacement;
    const emojiFaceDisplacementY = (relY / wrapperRect.height) * emojiFaceMaxDisplacement;

    gsap.to(emoji, {
      x: emojiDisplacementX,
      y: emojiDisplacementY,
      ease: "power3.out",
      duration: 0.35,
    });

    gsap.to(emojiFace, {
      x: emojiFaceDisplacementX,
      y: emojiFaceDisplacementY,
      ease: "power3.out",
      duration: 0.35,
    });
  };

  const leaveEvent = () => {
    if (!isEnabled) return; // Do nothing if not enabled

    gsap.to([emoji, emojiFace], {
      x: 0,
      y: 0,
      ease: "power3.out",
      duration: 1,
    });
  };

  wrapper.addEventListener("mousemove", moveEvent);
  wrapper.addEventListener("mouseleave", leaveEvent);
}

page1MouseFollower();











function page2EnterAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "0% 77%",
      end: "10% 77%",
      // markers: true,
    }
  })
  tl
    .from("#page2 .heads h1 span", {
      y: 140,
      stagger: 0.03
    }, "a")
    .from("#page2 .heads h5", {
      opacity: 0,
      duration: 1
    }, "a")
}
page2EnterAnimation()







function page3EnterAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page3",
      scroller: "#main",
      start: "0% 77%",
      end: "10% 77%",
      // markers: true,
    }
  })
  tl
    .from("#page3 #upper #left #heading h1 span", {
      y: 140,
      stagger: 0.02
    }, "a")
    .from("#page3 #upper #left #heading-2 h1 span", {
      y: 140,
      stagger: 0.02
    }, "a")
}
page3EnterAnimation()




function page3MiddleScrollAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page3",
      scroller: "#main",
      start: "65% 77%",
      end: "75% 77%",
      // markers: true,
    }
  })
  tl
    .from("#page3 #lower #head-1 h1 span", {
      y: 140,
      stagger: 0.02
    }, "a")
    .from("#page3 #lower #head-2 h1 span", {
      y: 140,
      stagger: -0.02
    }, "a")
    .from("#page3 #lower #head-3 h1 span", {
      y: 140,
      stagger: 0.02
    }, "a")
    .from("#page3 #lower #head-4 h1 span", {
      y: 140,
      stagger: -0.02
    }, "a")
}
page3MiddleScrollAnimation()




function page4EnterAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page4",
      scroller: "#main",
      start: "10% 77%",
      end: "10% 77%",
      // markers: true,
    }
  })
  tl
    .from("#page4 #heading h1 span", {
      y: 150,
      stagger: 0.05
    }, "a")
    .from("#page4 #text", {
      scale: 0,
      delay: 0.5
    }, "a")
}
page4EnterAnimation()




function page4MiddleScrollANimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page4",
      scroller: "#main",
      start: "55% 80%",
      end: "55% 80%",
      // markers: true,
    }
  })
  tl
    .from("#page4 #head-1 h1 span", {
      y: 140,
      stagger: 0.01
    }, "a")
    .from("#page4 #head-2 h1 span", {
      y: 140,
      stagger: -0.01
    }, "a")
    .from("#page4 #head-3 h1 span", {
      y: 140,
      stagger: 0.01
    }, "a")
    .from("#page4 #head-4 h1 span", {
      y: 140,
      stagger: -0.01
    }, "a")
}
page4MiddleScrollANimation()




function page6EnterAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page6",
      scroller: "#main",
      start: "0% 77%",
      end: "0% 77%",
      // markers: true,
    }
  })
  tl
    .from("#page6 #heading h1 span", {
      y: 150,
      stagger: 0.05
    }, "a")
    .from("#page6 #heading h5", {
      opacity: 0
    }, "a")
}
page6EnterAnimation()





function page6ScrollAnimation() {
  // Check for device width using window.innerWidth
  if (window.innerWidth >= 600) {
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#page6",
        scroller: "#main",
        start: "-15% 50%",
        end: "50% 50%",
        scrub: true,
        // markers: true (optional for debugging)
      }
    });

    tl
      .from("#page6", {
        rotate: "7deg",
        scale: 0.8
      }, "a")
      .from("#page6 #card1", {
        y: 300
      }, "a")
      .from("#page6 #card2", {
        y: 400
      }, "a")
      .from("#page6 #card3", {
        y: 500
      }, "a");
  } else {
    // Optional: Handle animations differently for smaller screens
    console.log("Animation disabled on smaller screens");
  }
}

// Call the function on page load or after potential DOM manipulation
page6ScrollAnimation();
  







function page7EnterAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page7",
      scroller: "#main",
      start: "5% 77%",
      end: "5% 77%",
      // markers: true,
    }
  })
  tl
    .from("#page7 #heading h1 span", {
      y: 150,
      stagger: 0.05
    }, "a")
    .from("#page7 #heading h5", {
      opacity: 0
    }, "a")
}
page7EnterAnimation()



