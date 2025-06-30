import Divider from "../scaffolding/Divider";
import Footer from "../scaffolding/Footer";
import CareerItem from "./CareerItem";
import Socials from "./Socials";
import Summary from "./Summary";

export default function Home() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Summary />
      <Divider width={80} dividerColor="grey" />
      <Socials />
      <Divider dividerType='section' width={80} dividerColor="grey" />
      <CareerItem
        title="🟣 Starling Bank (2019 - Present)"
        subtitle=" · Java · Postgres · TypeScript · React · AWS · "
        items={[
          <p key={1}>2022 -{currentYear} (Present): Engineering Lead</p>,
          <p key={2}>2021 - 2022: Team Lead</p>,
          <p key={3}>2019 - 2021: Software Engineer</p>,
        ]}
      />
      <Divider width={80} dividerColor="grey" />
      <CareerItem
        title="🔴 Sinara Consultants Ltd (2016 - 2019)"
        subtitle=" · C# · MySql · TypeScript · Knockout.js · "
        items={[
          <p key={1}>2017 - 2019: Software Engineer</p>,
          <p key={2}>2016 - 2017: Graduate Software Engineer</p>,
        ]}
      />
      <Divider width={80} dividerColor="grey" />
      <CareerItem
        title="🎓 Education"
        items={[
          <p key={1}>
            MPhys Hons (First Class): Physics, The University of Manchester
          </p>,
          <p key={2}>A2: Physics A* · Maths with Mechanics A* · Chemistry A</p>,
          <p key={3}>AS: Psychology A</p>,
          <p key={4}>GCSE: 8 A* · 3 A · 1B</p>,
        ]}
      />
      <Divider dividerType='section' width={80} dividerColor="grey" />
      <Footer />
    </>
  );
}
