import formatBytes from '../../MiniModules/byteConverter'

export default function DiskItem(props) {
    return (
        <div className="DiskItem">
            <img src='./icons/disk.svg'></img>
            <div className="DiskItem-body">
                <span>({props.fs}) {props.type}</span>
                <div className="Loaded">
                    <div className="LoadBody"></div>
                    <div className="LoadLine" style={{width: `${props.usedPercent}%`, backgroundColor: `${props.color}`, filter: `drop-shadow(0px 0px 25px ${props.color})`}}></div>
                </div>
                <span>{formatBytes(props.available, 1)} свободно из {formatBytes(props.size, 1)}</span>
            </div>
        </div>
    )
}