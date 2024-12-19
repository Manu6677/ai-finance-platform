import HeroSection from "@/components/hero";
import { featuresData, statsData, howItWorksData, testimonialsData } from "@/data/landing";
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-40">
      <HeroSection />

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((statsData)=>(
              <div key={statsData.value} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-3">{statsData.value}</div>
                <div className="text-gray-600">{statsData.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Every thing you need to manage the your finances</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((featuresData)=>(
            <Card key={featuresData.title} className="pt-4">
            <CardContent className=''>
              {featuresData.icon}            
              <h2 className="font-semibold py-2">{featuresData.title}</h2>              
              <p className="text-gray-600">{featuresData.description}</p>
            </CardContent>
            </Card>
              ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {howItWorksData.map((featuresData)=>(
            <div key={featuresData.title} className="pt-4">
              <div className='text-center'>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex justify-center items-center mx-auto mb-6">{featuresData.icon}</div>          
                <h2 className="mb-4 font-semibold">{featuresData.title}</h2>              
              <p className="text-gray-600">{featuresData.description}</p>
            </div>
           </div>
              ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonialsData)=>(
            <Card key={testimonialsData.name} className="pt-4">
            <CardContent className=''>
              <div>
                <div className="flex items-center justify-start">
                   <Image src={testimonialsData.image} alt={testimonialsData.name} width={40} height={40} className="rounded-full"></Image>
                 <div className="ml-3">
                    <h2 className="font-semibold">{testimonialsData.name}</h2>              
                    <p className="text-gray-600">{testimonialsData.role}</p>
                 </div>
                </div>
                 <div className="pt-4 px-2"><p className="text-gray-600">{testimonialsData.quote}</p></div>
              </div>
            </CardContent>
            </Card>
              ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-blue-600">
        <div className="container mx-auto px-6 text-white text-center">
          <div>
              <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances ?</h2>
              <p className="text-blue-100 mx-auto mb-8 max-w-2xl">Join thousands of users who are already managing their finances smarter with welth</p>
          </div>

          <div className="mt-4">
            <Link href={"/dashboard"}>
              <Button variant="outline" size='lg' className="text-blue-600 animate-bounce hover:text-blue-400">Start free trial</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
