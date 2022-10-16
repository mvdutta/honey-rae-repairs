export const TicketSearch = ({setterFunction}) => {
    return (
        <div className="ticketSearch">
        <input 
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
        type="text" placeholder="Enter search terms"/>
        </div>
    )
}