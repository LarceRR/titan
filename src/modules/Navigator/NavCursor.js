export default function NavCursor(props) {
    switch (props.currSwiperIndex) {
        case 0:
            return (
            <div className='cursor home'></div>
            )
        case 1:
            return (
            <div className='cursor chart'></div>
            )
        case 2:
            return (
            <div className='cursor weather'></div>
            )
        case 3:
            return (
            <div className='cursor cctv'></div>
            )
        case 4:
            return (
            <div className='cursor calendar'></div>
            )
        case 5:
            return (
            <div className='cursor settings'></div>
            )
        case 6:
            return (
            <div className='cursor security'></div>
            )
        case 7:
            return (
            <div className='cursor alarm'></div>
            )
        case 8:
            return (
            <div className='cursor messanger'></div>
            )
        case 9:
            return (
            <div className='cursor sys_info'></div>
            )
        
        default:
            break;
        }
    }