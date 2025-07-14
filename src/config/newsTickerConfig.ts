export const newsTickerConfig = {
  announcements: [
    {
      text: "DENIM RESTOCKED | LIMITED QUANTITY",
      link: "/shop/denim"
    },
    {
      text: "NEW SUMMER COLLECTION AVAILABLE NOW",
      link: "/shop/summer"
    },
    {
      text: "FREE SHIPPING ON ORDERS OVER $150",
      link: "/shipping"
    },
    {
      text: "EXCLUSIVE MEMBERS EARLY ACCESS | JOIN NOW",
      link: "/membership"
    },
  ],
  styles: {
    container: "bg-red-600 text-white overflow-hidden whitespace-nowrap py-1.5",
    ticker: "inline-block animate-ticker hover:animation-pause",
    link: "text-xs tracking-wider px-8 transition-opacity duration-300 hover:opacity-75 cursor-pointer"
  }
}; 