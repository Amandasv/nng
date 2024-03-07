interface Instructor {
  first_name: string;
  last_name: string;
  portrait_image: string;
}

interface Location {
  timezone: string;
}

interface Pricing {
  amount: number;
  currency: string;
  valid_until: number;
}

interface Course {
  id: string;
  dates: [number, number][];
  instructors: Instructor[];
  location: Location;
  pricing: Pricing;
}

export default Course;
