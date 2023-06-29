import './Cam.css'
import CamItem from './CamItem';

export default function Cam(props) {
    return (
        <div className='CamsBody'>
            <CamItem item='1' img='http://85.172.107.108:10040//axis-cgi/mjpg/video.cgi?resolution=800x600&color=1&fps=30'/>
            <CamItem item='2' img='http://85.172.107.108:10041//axis-cgi/mjpg/video.cgi?resolution=800x600&color=1&fps=30'/>
            <CamItem item='3' img='http://85.172.107.108:10042//axis-cgi/mjpg/video.cgi?resolution=800x600&color=1&fps=30'/>
            <CamItem item='4' img='http://85.172.107.108:10015/axis-cgi/mjpg/video.cgi?videocodec=h264&date=1&clock=3&resolution=800x600&streamprofile=quality'/>
        </div>
    )
}