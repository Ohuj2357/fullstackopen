const Notification = ({ message }) => {
    if (message === null) {
      return null
    }else if (message.charAt(0)==='I'){
        return (
            <div className='error'>
              {message}
            </div>
        )
    }
    return (
        <div className='added'>
          {message}
        </div>
    )
}

export default Notification