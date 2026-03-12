import { Link } from "react-router";
import { motion } from "motion/react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";
import { Service } from "../../api/serviceApi";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video relative overflow-hidden bg-gray-200">
          <ImageWithFallback
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-xl mb-2 line-clamp-1">
            {service.title}
          </h3>
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {service.city}
          </div>
          <p className="text-green-600 font-bold text-lg">
            {service.priceRange}
          </p>
          <p className="text-sm text-gray-400">
            {service.categoryName}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Link to={`/service/${service.id}`} className="w-full">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
