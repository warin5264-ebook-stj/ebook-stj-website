// app/page.js

import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import ButtonGrid from "@/components/ButtonGrid";
import LongButton from "@/components/LongButton"; // 1. Import LongButton เข้ามา
import STJSection from "@/components/STJSection";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HeroBanner />

         <LongButton /> {/* 2. วาง LongButton ต่อจาก ButtonGrid */}
         
        <ButtonGrid buttonIds={[1, 2, 3]} />
        <FadeInOnScroll>
          {/* <STJSection /> */}
        </FadeInOnScroll>

      </main>
      <Footer />
    </div>
  );
}