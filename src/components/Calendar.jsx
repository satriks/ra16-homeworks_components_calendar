import moment from 'moment'
import 'moment/locale/ru';


const Calendar = ({day}) => {

    const weekDays = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
      ];

    const monthLower = day.toLocaleString("ru", {month: "long"}  )
    const month = monthLower[0].toUpperCase() + monthLower.slice(1)
    const monthR = day.toLocaleString("ru", {month: "long", day: 'numeric'}).split(' ')[1].toUpperCase()
    const dayOfWeek = weekDays[day.getDay() ]


  
    const dayMoment = moment(day)

    moment.locale("ru")
    moment.localeData("ru")
    // Почему то локали не работают, название месяца и дня недели на eng =(

    // console.log(dayMoment.format("DD-MMMM"));   

    const date = dayMoment.format("D")  
    const year = dayMoment.format("YYYY")  

    const startDay = dayMoment.clone().startOf("month").startOf("week")
    const endDay = dayMoment.clone().endOf("month").endOf("week")
    
    const days = []
    const monthForWeek = []

    const dayTime = 24 * 60 *60 * 1000
    const countDays = Math.ceil((endDay - startDay)/ dayTime)
    const countDay = startDay.clone()
    
    for (let i = 0; i < countDays; i++){
        days.push(countDay.add( 1 , "d").clone())
    }

    const chunkSize = 7;
    for (let j = 0; j < days.length; j += chunkSize) {
        const chunk = days.slice(j, j + chunkSize);
        monthForWeek.push(chunk)
    }

    const weeksForCalendar = []

    for (const weekOfMonth of monthForWeek){
        const weeks = [...weekOfMonth].map( el => {
            if (el.isBefore(dayMoment.clone().startOf("month"))){
                return <td key={el.format("D-MMM")} className='ui-datepicker-other-month'>{el.format("D")}</td>
            }
            if (el.isSame(dayMoment)){
                return <td key={el.format("D-MMM")} className='ui-datepicker-today'>{el.format("D")}</td>
            }
            if (el.isAfter(dayMoment.clone().endOf("month"))){
                return <td key={el.format("D-MMM")} className='ui-datepicker-other-month'>{el.format("D")}</td>
            }
    
            return <td key={el.format("D-MMM")}>{el.format("D")}</td>
        }) 
        weeksForCalendar.push(<tr>{weeks}</tr>)
    }



    return (
        <div className="ui-datepicker">
        <div className="ui-datepicker-material-header">
            <div className="ui-datepicker-material-day">{dayOfWeek}</div>
            <div className="ui-datepicker-material-date">
            <div className="ui-datepicker-material-day-num">{date}</div>
            <div className="ui-datepicker-material-month">{monthR}</div>
            <div className="ui-datepicker-material-year">{year}</div>
            </div>
        </div>
        <div className="ui-datepicker-header">
            <div className="ui-datepicker-title">
            <span className="ui-datepicker-month">{month}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
            </div>
        </div>
        <table className="ui-datepicker-calendar">
            <colgroup>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col></col>
            <col className="ui-datepicker-week-end"></col>
            <col className="ui-datepicker-week-end"></col>
            </colgroup>
            <thead>
            <tr>
                <th scope="col" title="Понедельник">Пн</th>
                <th scope="col" title="Вторник">Вт</th>
                <th scope="col" title="Среда">Ср</th>
                <th scope="col" title="Четверг">Чт</th>
                <th scope="col" title="Пятница">Пт</th>
                <th scope="col" title="Суббота">Сб</th>
                <th scope="col" title="Воскресенье">Вс</th>
            </tr>
            </thead>
            <tbody>
                {...weeksForCalendar}
            </tbody>
        </table>
        </div>
    )
    
}


export default Calendar