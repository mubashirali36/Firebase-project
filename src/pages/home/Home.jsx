import { Link } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import ProductCard from "../../components/ProductCard";
import Spinner from "../../components/Spinner";
import React, { useRef } from 'react';
import { Star, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

// Images imports for Vite production safety
import heroImg from "../../image/image1.png";
import casualImg from "../../image/image4.png";
import formalImg from "../../image/image5.png";
import partyImg from "../../image/image6.png";
import gymImg from "../../image/image7.png";

const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];

function Row({ title, items, to }) {
  return (
    <section className="container-x mt-16">
      <h2 className="font-display text-3xl lg:text-5xl text-center mb-10">{title}</h2>
      {items.length === 0 ? (
        <p className="text-center text-muted">No products yet.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
      <div className="text-center mt-8">
        <Link to={to} className="btn btn-outline">View All</Link>
      </div>
    </section>
  );
}

export default function Home() {
  const { products, loading } = useProducts();
  const newest = products.slice(0, 4);
  const more = products.slice(4, 8);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const reviews = [
    {
      name: "Sarah M.",
      verified: true,
      rating: 5,
      text: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`
    },
    {
      name: "Alex K.",
      verified: true,
      rating: 5,
      text: `"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."`
    },
    {
      name: "James L.",
      verified: true,
      rating: 5,
      text: `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."`
    },
    {
      name: "Moiz R.",
      verified: true,
      rating: 5,
      text: `"Superb quality and fast delivery! The shopping experience was seamless, and the clothes fit perfectly. Highly recommended to everyone."`
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#F2F0F1]">
        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 items-center px-5 sm:px-8 lg:min-h-[580px] lg:grid-cols-12 lg:px-12">
          <div className="relative z-10 py-12 sm:py-14 lg:col-span-7 lg:py-10">
            <h1 className="text-[40px] font-black uppercase leading-[0.95] tracking-[-2px] text-black sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px]">
              Find Clothes
              <br />
              That Matches
              <br />
              Your Style
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>

            <Link to='/products' className="mt-6 inline-flex items-center gap-3 rounded-full bg-black px-10 py-4 text-sm font-medium text-white transition hover:bg-gray-800">
              Shop Now
            </Link>
          </div>

          <div className="relative min-h-[400px] sm:min-h-[500px] lg:absolute lg:inset-y-0 lg:right-[10px] lg:w-[83%] flex items-center justify-center">
            <span className="absolute left-[36%] top-[40%] z-20 text-4xl text-black sm:text-5xl">✦</span>
            <span className="absolute right-[5%] top-[10%] z-20 text-5xl text-black sm:text-6xl">✦</span>
            <img
              src={heroImg}
              alt="Luxury fashion collection"
              className="absolute bottom-0 right-0 h-full w-full object-contain object-bottom"
            />
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <div className="bg-black text-white py-8">
        <div className="container-x flex flex-wrap justify-center lg:justify-between gap-x-10 gap-y-4 font-display text-xl lg:text-3xl tracking-wider">
          {brands.map((b) => <span key={b}>{b}</span>)}
        </div>
      </div>

      {/* Products Rows */}
      {loading ? <Spinner /> : (
        <>
          <Row title="NEW ARRIVALS" items={newest} to="/products?sort=newest" />
          {more.length > 0 && <Row title="TOP SELLING" items={more} to="/products" />}
        </>
      )}

      {/* Browse By Dress Style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-[#F0F0F0] rounded-[40px] p-6 sm:p-12 mb-24">
          <h2 className="text-3xl sm:text-5xl font-black text-center mb-12 tracking-tight">
            BROWSE BY DRESS STYLE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <Link to="/products?category=Casual" className="md:col-span-4 bg-white rounded-3xl h-[289px] relative overflow-hidden shadow-sm flex items-start p-8 hover:opacity-95 transition">
              <h3 className="text-2xl sm:text-3xl font-bold z-10">Casual</h3>
              <img src={casualImg} alt="Casual" className="absolute -right-10 -bottom-10 h-[120%] w-[70%] object-cover object-top" />
            </Link>

            <Link to="/products?category=Formal" className="md:col-span-8 bg-white rounded-3xl h-[289px] relative overflow-hidden shadow-sm flex items-start p-8 hover:opacity-95 transition">
              <h3 className="text-2xl sm:text-3xl font-bold z-10">Formal</h3>
              <img src={formalImg} alt="Formal" className="absolute -right-5 -bottom-20 h-[140%] w-[60%] object-cover object-top" />
            </Link>

            <Link to="/products?category=Party" className="md:col-span-8 bg-white rounded-3xl h-[289px] relative overflow-hidden shadow-sm flex items-start p-8 hover:opacity-95 transition">
              <h3 className="text-2xl sm:text-3xl font-bold z-10">Party</h3>
              <img src={partyImg} alt="Party" className="absolute -right-10 -bottom-10 h-[130%] w-[60%] object-cover object-top" />
            </Link>

            <Link to="/products?category=Gym" className="md:col-span-4 bg-white rounded-3xl h-[289px] relative overflow-hidden shadow-sm flex items-start p-8 hover:opacity-95 transition">
              <h3 className="text-2xl sm:text-3xl font-bold z-10">Gym</h3>
              <img src={gymImg} alt="Gym" className="absolute -right-10 -bottom-10 h-[130%] w-[70%] object-cover object-top" />
            </Link>
          </div>
        </section>

        {/* Happy Customers Reviews Section */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              OUR HAPPY CUSTOMERS
            </h2>
            <div className="flex gap-4">
              <button onClick={scrollLeft} className="p-2 rounded-full hover:bg-gray-100 transition" aria-label="Previous Slide">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button onClick5={scrollRight} onClick={scrollRight} className="p-2 rounded-full hover:bg-gray-100 transition" aria-label="Next Slide">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {reviews.map((review, index) => (
              <div key={index} className="min-w-[300px] sm:min-w-[400px] bg-white border border-gray-200 rounded-[20px] p-8 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-bold text-lg">{review.name}</h3>
                    <CheckCircle className="w-5 h-5 text-green-500 fill-current text-white" />
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}