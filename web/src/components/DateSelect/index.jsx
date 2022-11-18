import { addDays, subDays, format,formatISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Icon } from "~/components/Icon";

export const DateSelect = ({currentDate, onChange}) => {
  const date = new Date(currentDate)
  
  function previousDay() {
    const previousDate = subDays(date, 1);

    onChange(formatISO(previousDate));
  }

  function nextDay() {
    const nextDate = addDays(date, 1);

    onChange(formatISO(nextDate));
  }


  return (
    <div className="p-4 flex space-x-4 items-center justify-center">
      <Icon name="arrowLeft" className="text-red-500 w-6" onClick={previousDay} />
      <span className="font-bold">
        {format(date, "d 'de' MMMM", { locale: ptBR })}
      </span>
      <Icon name="arrowRight" className="text-red-500 w-6" onClick={nextDay} />
    </div>
  );
};
