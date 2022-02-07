import Key from './Key';

interface KeyboardProps {
    rows: any[];
    states: any[];
}

export default function Keyboard(props: KeyboardProps) {
    const rows: [string[], string[], string[]] = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'delete']
    ];

    const colours: any = {};

    props.rows.forEach((row, i) => {
        const states = props.states[i];
        row.forEach((character: string, j: number) => {
            if (['wrong', 'present', 'correct', 'correct finished'].includes(states[j])) {
                colours[character.toLowerCase()] = states[j];
            }
        });
    });

    return (
        <div className='keyboard'>{
            rows.map((row, i) => {
                return (
                    <div className='keyboard-row' key={i}>{
                        row.map((key, j) => <Key key={i + j} type={key} colour={colours[key] || ''} />)
                    }</div>
                );
            })
        }</div>
    );
}
