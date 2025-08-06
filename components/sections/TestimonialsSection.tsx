"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaStar, FaLinkedin } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Marketing Lead, FinTech Co.",
    photo:
      "https://media.licdn.com/dms/image/v2/D4E03AQFbSkQKmZY5eQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1714743580726?e=1757548800&v=beta&t=-QfVvQHsr-eDtqd9Iot7Vwjdu0XDXLrvgZB11V3YZ9Y",
    quote:
      "ADmyBRAND AI Suite transformed our marketing! Campaigns are smarter, faster, and our ROI has never been better.",
    rating: 5,
    linkedin: "https://linkedin.com/in/priyasharma",
  },
  {
    name: "Alex Kim",
    role: "Founder, StartupHub",
    photo:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQERUSEBIQEBAVFhUPDxAQDxAPDxAQFRUWFhUVFRUYHSggGBolGxYVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0lHx8tLS0tLS0tLS0tLS0tLS0tKy0tLS0tNS0tLS0tLS0tLS4tLS0tLS0tLS0tLSstLSstLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAgMEBQcAAQj/xABAEAABAwIEBAQEAwYEBQUAAAABAAIDBBEFEiExBkFRcRMiYYEHIzKRobHBFDNSYtHwQoKS4RUkU7LCFkNjcqL/xAAaAQADAQEBAQAAAAAAAAAAAAABAgMEAAUG/8QAKBEAAgICAgICAQMFAAAAAAAAAAECEQMxBCESQTJREwUicRRhgZGh/9oADAMBAAIRAxEAPwDTWheyDRetC9eNCpodgviUZN1YcMjfuoNZL5iLKx4d3KnkXdlYy/ZQQOCYeFIcmXhLQClxxl2IfFM7KLX2RPig0UKaWKKIySuayNou5zjYAJG3fQ3VFJHA8kKyrH+HH5iBpuTYLO+I/iNIXFlE0MZsJXNzSHcEgHRvvdAtVXyzOzyvfIb3u9xdc9blXhjk9k3JLRqcuKWJ8wITf/HgOYWa0eImM2t3vfTta32Vq6ricL3I0ueoPSy6UJx12MpRYbf+oh1C9ZxEHGwQV4bTqDcK3wCkaXaqMstIosdsK2VzyLpJrnq5o6FmXZO/8OZ0Wb+okU/HEoBWyHYJ1skx2ar6KgYDsrihomdAmjmnIWUYoCnCoGuVQTiUmbLYrUJaBhGwQpX4cxr9lR5JR2LHxkUOSqOoAsnC2o6Izo6VmVO/srOgQ/JINIBcs/Rd4dR0R1+yM6Be/srOgXecgftAPwajoudT1A3uj9lGzoE5JQttsF3lM64mbES+qdhp5XAm59kWVlGwHZIijYAdFN5ZFKiZ/X1ckTrEn0UQ4s7qUT8RUbJC2w5qFFgbei045WuyM1T6KF2JPPVaDw1JmjB9FSDCIxyCJsGgDGiyqidkt4TLgpLwmXBMAYsuS7L1cNZeNCU8aLmr1+yKEZRTwgkqdg0QaTZRpBqVMwzddLQI7LVyacnSmyoFCsxUeVY58SMWknmMAcRDBZuQEgPlyg5ndbXIHYrZcVHlWCYnGXVkjSTZ01nXGwL9UYfKwy+JTijLdN3cyPVSqfBaiTVkb8uwJWvQcN00bG+QO235/wBlWEdO0DygAcgAAAPRK+W9JFo8WPtmMTcI1h/9v8RdR6nh6siYXvicGAG5BBt62vdbbJCeiZkiDvK4Ag6EHYhBcmfsZ8aHox3BKjO0tO7RcXHJFvDrPMhqWjFLWSxWs3MQzsfMP0RXw4PMl5P2vYuH6foOqNvlUmyapR5U+sI7Oa1WmGquarLDlbH8ic9Fi/ZCONSNDkWTHRZrxPO4zho25q+RX0Jj+wropgWp/wAQKpw2+QJ4vIKRRGbLDOuEihNkKadMQmcQJhFhYa699bWVhJACNNEI4fiLmP01B0I6ooirLt0H4qsGqpk5J2UGIs1UGRmita8aqFI3RZZLs0RfQJ4jLldqm34k0N3Ubim4OiEpZndVfG6iJNWwiq8dA5o04enzxg+ix2TXda5wiPkt7BWg7ZNqkXLwmiE+4JtwVBBmy8S7LlwS7avX7LgvX7IoQppNypeHbqNINSpFBuulo6Oy0uklerxRKEDFfpWK4tTFmJ5JNBJM1wPIse4f1/BbXiv0oNxrCm1BZHlaHML6oSWs4vDmkMHXQ/3ZI5+Mv5Kwh5r+CZxCywBdUmnjFgAGi5PQcyfRDlFiEmY+FWySNBylssDWgu6B1kdVEOmhsRzG6qRRMc8CTXnqd7KKlSNSjfY3i872xDz+GbXc4C5Gm6GKN8ch889e5wdlLyBladdcrRcDTc6bdQjfGaIWBGwAPtZM0dMCNL25jMbe4TRk10c4pqwAx7CTLiLGtdc+A2QyOGji3My5yjmQ1TOG2+bXe9kUVFIxs7pjbywGMDnbPmPtt90NcL6uudybnuUuaVxRNRS/yHdK3yp+yTSt0T2VZ0KxICssOCgAKyw8KuL5E5vomTt8qzfH4v8AmQtLmGizziLSoatE9iQZeULPKF5MzVO4ePIFNihBKEFbA3RDhgNkmSiJV/HALJEsQV3jJ+YOx0RDgiCmbYKE+wKsYdknikMpWV9e3VQZBorCvUJw0WaWy0dAnj1NmQLiMGQrRMXdZAWOuu5UjoPsp3Ba7wmPkt7BZG7cLXuFB8lvYK2PYk9Fw4JshOuTblUiNWXq9suXDFyF67Yrmr12yZCFPINSn6LdMyblO0e6EtHR2WS9SQV6olCFin0qul0icQNcpt1vYj9VY4n9KhtHl9lHJspB0ionxUNhkeBmLW5yBudLqgwvFZ5HktDWygE2L/mBhB1DbGzbdU3V1LqaZ7HXcBrGd80ZuRf7EeyIMJqmFjZ2tyvDTHmaNcv8JHMaDRIlWzWn10MPxGscMhyX2zDcAdhv7KrOJVDZSGMD3sIExZnFi5w8rrjW4PdX7uKiTkD3ZtrhjQ697/w+vRUuP4mYWWbpJI4uc551PUk9fTsrNL0C6RH4ixp7C+NmW0jfDc7W4aN8ve5CZ4Vbqh2SYyOzH29AibhUarPl0InbDymGidskU40TllJE2egKwoVXhT6EquPYktE2bZZ9xGLztWgy7LPeJP37VbKJEIMPHkCmU8nVQ8OHkHZJllsV2F9iz0EUTxZMzPCj0jiQnHrcZ+yHIzVWFONEwISVNbHYLNJdlYaK2vURw0UquGqjHZZZbNMdAnxA6yAsUddyOuJkBYhunjoZkJxWv8J/uW9gsfP6rYOEv3LewV8eyU9Fy5NuCdcmyrEhteL1cgMXISnbLxq9dsmQjKiTcpyl3Tcm5TtNuhLQFsnhehJSgooqRMS+lU8+MQQzQQzODfGJbckBrBY2Ljyu4Bo9SpXEuMU9My88gboSG2LnuHo0a+6xPG8WdVTOkfYg6NG4awbNHsrYeN+Sdy0TyZfGNLZq/F3Dhc2+py/TKwat9COnpsgSixKqo3Fha+SM63Hm16/gr7gHj0sLaWtdmYbMgndqRfQMkPPoHHsUd1/DdPN5mDw3HW7ACx3du32suycRwfWvopj5Kl8t/ZnD+Krtu1jzKdm+G8u+1kjD8OmmzzTaSZXRwMcRYPcLAk7A3IHoi2pwh0RIcA9o+pzNQD6jkq3GpGxRsF8odLC256eK2/4ArOk/JQaqzTKScXK7oCDA6NxY9pY9pyua4WIKKeFGq/x3BmVMLXWyzCwjkA3B2a8/w+vIlUnCYUuViePehMWRTQc07dE5lXQDRO2WdI5jYaplGFHAUqlVMa7FlolSbIC4gZedvdHsuyBceHzgrZBIF3QDyBSWUWYpih+kK4pymwoSfQqKmsE3O0BSnyWCoMcxVkQuSB7rUyJbwkKU7ZCWD44JNiESRy3CSTQ0eyvxDdRjsnq52qaOywSfbNa0B3EyA6/dHfE+6A8Q3TR0OyC7f3WwcJD5Leyx8/qth4S/ct7BaMeyU9F0U25OOTZVyI2uXq5AJcBKdskhKdsmQrKh+5TtNum37lO0266WgLZJmmbG0ve5rGAXc5xAaB6lAnEXxEYAWUep2MzmnT/6NO/c/ZDnHPEbquYxscRTxktYBtI4aGQ9fT07oTkZdacHGVXInkyvSHKrEpHyl8jnPLtHucS4k9dVXVbMhzN+k7jknHtPPbqlgXFitlEBhk5Jylp1v6iy1H4acYlrhSVLrtOlPI46tP8A0yenQ+3RZWAWO69L82/1UuN/MX/Ig/oV3ipKmdddn0JSkDM9/wDM9511ab30QJiNG6rqoIGkta137Q82vZsZB5+w/wAyuPh/xEK2Mxyn/mYx5v8A5Y9s9uvI+3VXeH4O2KeSQHRzWtazmy5JcAf4dG/ZYs2NvJF/RoxTUYSX2UvGmOMoqV0bT8+Rp8FnS1gHHpYm+u+WyyzhviSopXBoIcBpkkBP2O4Vnx5A+PE6jM4uz5Hsza2ZlFmj0FjohqpZqHDkfwK1fijKNSVkPNp2jYMF49ppLNmDoHcyfPH/AKhqPcItjmDgHNIc06tc0ggjqCN18+OfseR1HoeatcAx+Wkla9jj4dx4sdyWPYT5tOvMFYs/6bFq8br+xeHJepG4Z1JpXqJGQ4BzTdpAc0jYg7EKTTNXkwuzW9EyV2iA+IJQJgjuQaIA4liPjN7qszoF/QSEtFlbxZrKu4fhu1Xwjsnxx6I5H3RWV75MulgVlfGlRNns69unJa7VM0Wdca0/nGndVkqEjsf+GmElzfGfc62Y03sPVaOGaKn4ZibFCxo2sFdyv00RdUFbKCtfqkZ9E5WMuUgx6Lzntmv0BXFMuqBa+TVHPFUWqBa5mqrDQ0iEX6+62PhE/Jb2Cxst1WycIfuG9gtGPZGei7cm3JxyacrEhK8XLxAJdBKOyS1eu2TIVlS/cqDxBVGKkne02cIy1p5hzvKCPXVTn7lUHHbiKJ1ub2A9r3/MBNFW0hG6RlZampAnympF6UTOyM71XrAvHLxOhTyVocLD6hqElo5jfmOqjyTZXjv+Cnhmt+qOziRg+JPppmTxGzmG9uo/xNd6EXC3zBq+OpjbNFq2Rgdbm1zTYg+utvZfPT22OYf5h19e6P8A4T41kmNK4+SQF8J6SAXc0d2i/wDl9VPLG1YYs74v0WWeCbk9ro3dxYj8LrPnt3Hp+S2P4t0gfQiS2sUrHX/lech/7gsfO6OJ3E6WzpB5QkNdeM+psfsSlzOs3qdNAmIr5LEWGrjfe1jZOxTRvhlxIWuFJKbtfYxOJ+iQ/wCDsfz7rVadfNVLO64e0ltiC07G42IX0LwxiTaqnjlBBc5o8QAg5ZAPMD01/NeTzsKjJZF72bME7Xiy6dsgfiVnzAUcckI8Rs8wKyTVovB9lzw+7yBW8psqDh+WzVcvfdUwxuKJZemRJy9DOO0oeCDufzRe4KlxyDTME840hYbLHhyi8OFgdq4AC5VlUs0uo+EzB0Y5G2oUmpdpZdKvEKuykqt0k7JVSNUnkvO9mr0BfFW6Aq/dHvFiAq/dPDQ7IDlsHCP7lvZY+5a/wifkt7BaMeyU9F45NOTjk25WJCF4vVyAS5avXbJLUpx0ToRlQ/cqi46YTRPI/wALmOPbNb9VePOp7qDxDTeLRzsFychcANyWWeB/+U8XTTEatGOpqb0TvNJlaeW69FGdkFxI3/FJc640/Apx0Q3cST0TRb0Nh0TildNJfuLg+xurqmfdoVPXRZfMNf4vewurCjd5QEI7C9E6y6hqnU8rJGaOY4Ss7tIJHv8AqvGu0SKja/TX+v4XTsU2vi+cT4VNILFj4RMwjW7bB7ViYWjYXiPi8P1DSbuhZJD/AJSQ5v4PA9lm4OinjVWgsWALKPVyAMda21tdk+XKBVnS3U69hr+id6OQ9TbXFz6nf26Ba/8ACPE4jC6AvtNnMjY3WF2FoF29djdY+9j22a9rmEm9nNLTktvry9VMo6kxva9pLXtIcwjQtIOhCjlxLLDxsaEnCVn01yQzj0fNTuE+II66nEjbB48szBux/wDQ7j/ZQ+JJA1jj0BXjTi42n6N0HehGGOswFTxK4nTZUWG1F2AIloY72U8DfofKqJcIJbqoeIxZgB6q4EeirqwgOHdaZptURi6HqCnsFJlYugOiW/ZHxpA8rZSVgsUwTopOI8lCcdF5s+pM1R0B3FjkB1x1RxxWUC1h1TQ0UkQ3rX+EP3LewWPvWvcHn5LewWnHsjPReuTbktybcVYkJXi665AJdNXr9kkJT9k6EKZ51Kfp1GedT3T9OV0tHLZjeP0Bp6iSIjRjzk9Yzqw/YhQVpXxHwTxYhUsHniGWQfxQ337tJ+xPRZndbsOTzjZCcfFjTmaph7bE/mpZCjyLQiTGCwWsduajwHwzl5bt7KYW2F0ukiifIzx7+Fez8pyuDToTf00K6XXZy7dCGyJWcEWRViPAbBrTzvb/ACSM8Uezm2P5oYreG6qN+Vzo7crFw7XFlCPMxy0y0+Nkh20XfCFbejxCAnenMgHrESHH7FqG/E0H98lLbTS0wdZ31NdE4gaOjeLOaSdwfXUfZQBCOV9OV9R/VVhK+0Rao9lnsEWcDYJHNGJJYw+SSQeA5xPkaw5i4Dne1vdB8tDfdzrdOfa6KKTit8WXwoY2BjfDY0uc5rdrnlvYaKPIWSSqBo47xxdzCviTDoKh9RLVl7WU0PhRvYctngF7nfzauAt6FZZBNfffd3dEU/FNY8EZwwFxkIYxou5xLjqQTueqpmt6ADnoANUePjnBVIGecJu4hDwTxGaKoa+5MbvJM3cOjPO3Ubj/AHWh8Z1edoDCC11iCDcFu4ssbc080U8MYm+RvgSHMIyDETuGG/lPY/mo87F5R8l62dx5pOmHWCQmwRjhp0VBhIGUK+pXLBgioovllbLZz9EM45VkPbbqreeawQfjc5LwqzlQkY2FOH12YKwMlwhnB5TYIgY7RCU7QVGiDXnVRSNFJrN1HcdF58/kaY6Afi79UC1Z1RxxgfzQLU7o49FJER61zg4/Jb2WRSLWuDT8lvZaceyM9BC4ppxS3FNOKsSPLrki65Aai9CU/ZIavZToUyEKR51PdP05UV51PdSKYrpaAtkith8SKSO187Hst1zNIWDMvazhZ40e0ixDuen3W/NKyr4n4X+z1Lalg+XP5Xgf9UDX7gA9wVTizp19gzxtWC5TThqngQRcG45EbFNuC9JMysZmOthyUOcX7aDupLzqU24dfYJmKHnB3Fsb2thqC2N7QI2SXsyS2lyT9JT/ABJSCOQyvefDcAQ62ZrX6DJoLgHcEc7301GeBosva7FKgwGDxC6G7XBrvMWOaQRkJ1A0tb1WGfESl5Q/0a1yHKPjIMoMMFbFMWGxicLEA5XOsbb6kHXX0G6D3wkHoR+iThHEstM18LHucx7g4utlu6wFiDyH9U8ZQNzrzJ6ndU4yknK9E8vjSrZwfcapA3/vVe52/wAQ6/r/AE+6ZP8AuO612QJAsuJTQevM66wC3FXfB0ZdO638Fz7OCHy9Fvw8iu6STlZsY73ufyH3WblyrDJlsEbyI1HC4/KFbwtUHD/pVi1y8jHI2TiIqdkLYhAXPRNUP0VWWguSZZhxxF4bAQArxh0UCAgBPum0XefQa7Gas6qM86LqiW5TD36FZJPsqkB3FpQNVHVGPFj0FVCri0NMjSFazwa75LeyyKQrWeCz8lvZaYbIy0EjimnFKcU04qpM668Xl1y4JfNXSnylJaV0x8pREKJ51PdSqQXUFx1Kk0sll09HRXZZtahL4p0gfQ5j9Ucsb2epN2f+V/ZFLakIH+KOLjJHTDdx8eXqGNuGj3JP+lLx+8iobL1F2ZuyVkeWLa/0n1PXunZAoMrfNmdudvRdHiI+l+h5O5e/ReunRhFuKSvJnapLXqgoshIc0JWdcSuOIRpbnMNLEHXmB1The92pygXt9OhGl+add67dP6rxrb77fn/sl8UNZGdUua4+RruxIUyhhlqMwiie4tALg0XIB0GnPZeeGL3tr1RHwDiDYanIW3M1ow69smXM6/rfZSyXjg5R9DwqckmDzopG6OY9p/mY4H8QrDD+H62o/dU8xB/xOb4bP9T7BbAau2ltBsuFeV5j/VZV1H/pr/ol9gNSfDKoIvPPFF1bGHSut3OUA/dW1BQR0toYiS0G5c4jM5x3JsiKorSWlCVVM4SXtzWPJycmXqT6NGPDGHaNAw93lU3Pog6jxbK3mpBxs+q6MqFlHsIJ3qKDqqCXGCeqbZipU5O2Oo0FjXJeZC7cVupkVfdCTOUS1kCaeNFVS16YlxDQqTKKJQ8WEdUGTuCt+I6hzihyRritWKPRPI+zpCtW4Jd8odlkL2OWscDn5Tey0xVEWwpcU04pTnJlxTio665IzLxcEIWldUHyleLkRAdLtU61y5clyfFhh8hbHlZLxRWmaqmfe/nMTb8mRHL+YJ91y5H9PVybO5WkUVSNNTf++igzt1/vquXL1jCewsvcXt09CmnPc02J0XLkGgoeMrhovW1PUfiuXI2AsKmhmjY1748rXAOYczDcOFxoDp7qL4ttwb69OVr/AJheLkmSbjoaMUxfjDl7qz4cmy1UDukjR9zb9Vy5dN3B39HR6kay5xS4iuXL5ZHtD0rRZDlS2716uVY7FLOkgFk+adv9hcuVkiTZHmhHp9lHEYXLkGFD8cQ9FYRRC3L7LlynIZEeoZ2+yiTN05fZcuUyqBfFoQSqd8I6Lly0w0TkRZYh0WhcHaRjsuXK0dkZaCF5TLnLlyqIN5ly5cgcf//Z",
    quote:
      "The automation and analytics features are a game changer. Our team collaborates seamlessly and saves hours every week.",
    rating: 5,
    linkedin: "https://linkedin.com/in/alexkim",
  },
  {
    name: "Sara Lee",
    role: "CMO, RetailX",
    photo:
      "data:image/jpeg;base64,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",
    quote:
      "We love the content generation tools! Our creatives are more engaging and our workflow is so much smoother.",
    rating: 4,
    linkedin: "https://linkedin.com/in/saralee",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  // Autoplay logic
  useEffect(() => {
    if (!paused) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, paused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current]);

  const prev = () =>
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((current + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="py-20 bg-gradient-to-b from-gray-50 to-white px-4"
    >
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-blue-700">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 text-lg">
          Real stories from teams using ADmyBRAND AI Suite.
        </p>
      </div>

      <div
        className="max-w-xl mx-auto relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Customer testimonials carousel"
      >
        <div
          data-aos="fade-up"
          data-aos-once="true"
          className="bg-blue-50 rounded-3xl shadow-lg p-10 flex flex-col items-center text-center transition-all duration-700 ease-in-out"
          key={testimonials[current].name}
          aria-live="polite"
        >
          <Image
            src={testimonials[current].photo}
            alt={testimonials[current].name}
            width={96}
            height={96}
            className="rounded-full mb-6 border-4 border-blue-200 object-cover shadow-sm"
            priority
          />

          <div className="flex items-center mb-4 space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`text-xl ${
                  i < testimonials[current].rating
                    ? "text-blue-400"
                    : "text-blue-100"
                }`}
                aria-hidden="true"
              />
            ))}
            <span className="sr-only">
              {testimonials[current].rating} out of 5 stars
            </span>
          </div>

          <p className="text-xl italic font-serif text-gray-900 mb-6">
            &ldquo;{testimonials[current].quote}&rdquo;
          </p>

          <div className="flex flex-col items-center gap-1">
            <div className="font-semibold text-blue-800 flex items-center gap-3">
              {testimonials[current].name}
              <a
                href={testimonials[current].linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn profile of ${testimonials[current].name}`}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="text-gray-700 text-sm">{testimonials[current].role}</div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-center mt-8 gap-5">
          <button
            aria-label="Previous testimonial"
            onClick={prev}
            className="w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-600 text-2xl shadow-md transition"
          >
            &#8592;
          </button>
          <button
            aria-label="Next testimonial"
            onClick={next}
            className="w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-600 text-2xl shadow-md transition"
          >
            &#8594;
          </button>
        </div>

        {/* Dots */}
        <div
          className="flex justify-center mt-6 gap-3"
          aria-label="Testimonial navigation dots"
        >
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to testimonial ${idx + 1}`}
              aria-current={idx === current}
              className={`inline-block w-4 h-4 rounded-full transition-colors duration-300 border-2 ${
                idx === current
                  ? "bg-blue-600 border-blue-600"
                  : "bg-blue-100 border-blue-100"
              }`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s;
        }
      `}</style>
    </section>
  );
}
