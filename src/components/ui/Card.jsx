export default function Card() {
    return (
        <div style={{
            flexGrow: 1, maxWidth: "300px",
            backgroundColor: "var(--amt-secondary)",
            borderRadius: "1em"

        }}>
            <div style={{
                backgroundColor: "black",
                borderRadius: "1em",
                height: "100px",
                width: "100%",
            }} />
            <div className="mt-3" style={{padding: "1em"}}>
                <div className="amt-flex" style={{ justifyContent: "space-between" }}>
                    <p>London</p>
                    <p>$539</p>
                </div>
                <div className="mt-3">
                    <p>Mar 9 - Aug 10</p>
                </div>
                <div className="mt-3">
                    <p>1 stop15 hr 5 min</p>
                </div>
            </div>
        </div>
    )
}