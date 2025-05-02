import TopBar from "@/components/global/topBar";
import Nav from "@/components/global/nav";
import Hero from "@/components/page-sections/home/hero";
import Marque from "@/components/page-sections/home/marque";
import ProductSctions from "@/components/page-sections/home/productSctions";
import { products, testimonials } from "@/constants/data";
import Categorys from "@/components/page-sections/home/categorys";
import Testimonials from "@/components/page-sections/home/testimonials";
import Cta from "@/components/global/cta";
import { Footer } from "@/components/global/footer";
export default function Home() {
  return (
    <>
      <Hero />
      <Marque />
      <ProductSctions title="Featured Products" products={products} />
      <ProductSctions title="Top Selling Products" products={products} />
      <Categorys />
      <Testimonials title="Testimonials" testimonials={testimonials} />
      
    </>
  );
}
