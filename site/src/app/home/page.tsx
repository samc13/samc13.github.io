import { RiPlanetLine, RiSparkling2Fill, RiSparkling2Line } from "@remixicon/react";
import Divider from "../scaffolding/Divider";
import Footer from "../scaffolding/Footer";
import SectionTitle from "../scaffolding/SectionTitle";
import CareerItem from "./CareerItem";
import iconClasses from "./../core/icons.module.scss";
import Summary from "./Summary";

export default function Home() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Summary />
      <SectionTitle text='Career' />
      <Divider />
      <CareerItem
        title={<p><RiSparkling2Fill color="#7433FF" className={iconClasses['inline-icon']} />Starling Bank (2019 - Present)</p>}
        subtitle=" · Java · Postgres · TypeScript · React · AWS · "
        items={[
          <p key={1}>2022 -{currentYear} (Present): Engineering Lead</p>,
          <p key={2}>2021 - 2022: Team Lead</p>,
          <p key={3}>2019 - 2021: Software Engineer</p>,
        ]}
      />
      <Divider />
      <CareerItem
        title={<p><RiSparkling2Fill color="#E30614" className={iconClasses['inline-icon']} />Sinara Consultants Ltd (2016 - 2019)</p>}
        subtitle=" · C# · MySql · TypeScript · Knockout.js · "
        items={[
          <p key={1}>2017 - 2019: Software Engineer</p>,
          <p key={2}>2016 - 2017: Graduate Software Engineer</p>,
        ]}
      />
      <Divider />
      <SectionTitle text='Education' />
      <Divider />
      <CareerItem
        title={<p><RiPlanetLine color="#FFCC33" className={iconClasses['inline-icon']} />The University of Manchester (2012 - 2016)</p>}
        items={[
          <p key={1}>
            MPhys Hons (First Class) Physics
          </p>
        ]}
      />
      <Divider />
      <CareerItem
        title=""
        items={[
          <p key={1}>A2: Physics A*  ·  Maths with Mechanics A*  ·  Chemistry A</p>,
          <p key={2}>AS: Psychology A</p>,
          <p key={3}>GCSE: 8 A* · 3 A · 1B</p>,
        ]}
      />
      <Divider />
      <Footer />
    </>
  );
}
