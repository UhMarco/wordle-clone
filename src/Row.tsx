import Tile from './Tile';

interface RowProps {
    data?: string;
    states?: string[];
    invalid?: boolean;
}

export default function Row(props: RowProps) {
    const tiles: any = [];
    for (let i = 0; i < 5; i++) {
        tiles.push(<Tile key={i} delay={i} data={props.data ? props.data[i] || "" : ""} state={props.states ? props.states[i] : ""} />);
    }

    return (
        <div className={`row ${props.invalid ? "invalid" : ""}`}>
            {tiles}
        </div>
    );
}
