import fitness from "../../../assets/fitnes.png";
import spa from "../../../assets/spa.png";
import restaurant from "../../../assets/restaurant1.png";
import { CardDemo } from "@/components/ui/bg-picture-card";

const ServicesPage = () => {
  const services = [
    {
      title: "Honeymoon Package",
      description:
        "Choose the honeymoon package that suits you the best and enjoy moments of endless relaxation and restoration specially designed for you and your other half.",
      image: fitness,
    },
    {
      title: "Wellness",
      description:
        "Book among an exclusive range of invigorating spa treatments and enjoy moments of ultimate relaxation at the hands of our experienced professionals.",
      image: spa,
    },
    {
      title: "Transfers",
      description:
        "Travel with safety and comfort to and from the airport to the hotel and prime spots and places.",
      image: fitness,
    },
    {
      title: "Florist",
      description:
        "Anniversary, birthday or romatic dinner, elevate each and every moment of your special occassion with the most delicate and fresh accessory.",
      image: fitness,
    },
    {
      title: "Excursions",
      description:
        "Meet the city's beautiful places and culture choosing among a unique selection of excursions.",
      image: fitness,
    },
    {
      title: "Culinary Experience",
      description:
        "Our inspired chefs take great care in preparing a variety of specialties and dishes with the freshest, seasonal ingredients, while several theme nights are offered to satisfy all tastes.",
      image: restaurant,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl text-center m-4 mb-8">Plan Your Holidays</h1>
      <p className="text-center mb-8">
        Discover a wide variety of services and unique activities, selected to
        make your holidays with us even more special. Choose the ones that suits
        you the best, book fast and easy beforehand and shape the holiday
        experience you are looking for.
      </p>
      <div className="grid md:grid-cols-3 md:grid-rows-2 gap-3 text-center place-items-center">
        {services.map((service) => (
          <div key={service.title}>
            <CardDemo service={service} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
