interface TileProps {
    data?: string;
    state?: string;
    delay: number;
}

export default function Tile(props: TileProps) {
    const flipping = ['correct', 'present', 'wrong', 'correct finished'].includes(props.state || '');

    const style = {
        animationDelay: `${props.state === 'correct finished' ? props.delay * 0.2 : props.delay * 0.4}s`,
        transitionDelay: `${props.state === 'correct finished' ? props.delay * 0.2 : props.delay * 0.4}s`,
        transitionProperty: 'all'
    };

    return (
        <div className='tile-container'>
            <div className={`tile ${[props.state || 'empty']}`} style={flipping ? style : {}}>{props.data}</div>
        </div>
    );
}
