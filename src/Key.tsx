interface KeyProps {
    type: string;
    colour: string;
}

export default function Key(props: KeyProps) {
    const check = ['enter', 'delete'].includes(props.type);

    const alternate: any = {
        'enter': 'Enter',
        'delete': 'Backspace'
    };

    const press = () => {
        window.dispatchEvent(new KeyboardEvent('keydown', {
            key: check ? alternate[props.type] : props.type
        }));
    };

    const style = {
        transitionDelay: props.colour === 'correct finished' ? '1.1s' : '1.95s'
    };

    return <div className={`key ${props.colour} ${check ? 'wide' : ''}`} onClick={press} style={style}>{props.type}</div>;
}
