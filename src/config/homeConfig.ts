export const homeConfig = {
  logo: {
    src: "/icons/white_mindless.png",
    alt: "MINDLESS",
    width: "w-32",
  },
  
  navigation: {
    links: [
      {
        text: "SHOP",
        route: "shop",
      },
      {
        text: "ACCOUNT",
        route: "account",
      },
      {
        text: "SUPPORT",
        route: "support",
      },
    ],
    styles: {
      container: "space-y-4 mb-8 text-center",
      button: "block w-full text-xl font-bold tracking-widest hover:text-gray-300 transition-colors duration-300",
    },
  },

  dateTime: {
    styles: {
      container: "text-sm mb-6 font-normal tracking-wide opacity-80",
    },
  },

  socialLinks: {
    icons: [
      {
        type: "instagram",
        url: "https://www.instagram.com/_adh_vm?igsh=MWVwZDYwdDRnMjVsbQ==",
      },
      {
        type: "tiktok",
        url: "",
      },
    ],
    styles: {
      container: "flex justify-center space-x-4",
      icon: "w-5 h-5 cursor-pointer hover:text-gray-300 transition-colors duration-300",
    },
  },

  audio: {
    src: "/audio/Shehab x Alfy - Mrzmn [Official Audio] _ شهاب و الفي - مرزمن.mp3",
  },

  backgroundVideo: {
    src: "/video/136a343820284cf2a1efcdec66e57f9c.HD-1080p-4.8Mbps-26576976.mp4",
    type: "video/mp4",
    styles: {
      container: "absolute inset-0 w-full h-full object-cover",
      brightness: "brightness(0.6)",
    },
  },

  layout: {
    container: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden",
    content: "relative z-10 text-center text-white flex flex-col items-center justify-center h-full w-full",
  },

  controls: {
    styles: {
      container: "fixed bottom-8 right-8 flex items-center space-x-2",
      cdImage: {
        container: "relative w-20 h-20",
        src: "/cd/sony-c-d-r700-m-b-recordable-disc-ytzcoymp7dnhwc3m-ytzcoymp7dnhwc3m_7dede0a9-f601-401e-9edc-d85728ed6d30.png",
        alt: "CD",
        styles: "w-full h-full object-contain",
      },
      playPause: {
        container: "w-14 h-14 flex items-center justify-center transition-opacity duration-300 hover:opacity-80",
        icon: "w-12 h-12 text-gray-400 opacity-70 fill-current",
      },
    },
  },
}; 