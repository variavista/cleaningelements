// Update the getElementIcon function in RoomCard to handle all elements:
const getElementIcon = (element: Element) => {
  const option = elementOptions.find(opt => opt.value === element);
  return option?.icon || <Star className="w-6 h-6 text-gray-400" />;
};

const getGradientColor = (element: Element) => {
  const option = elementOptions.find(opt => opt.value === element);
  return option?.gradient || 'from-gray-500 to-gray-400';
};