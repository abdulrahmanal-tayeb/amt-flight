export default function Card({
    name,
    imgSrc,
    price,
    stops
}) {
    return (
        <div style={{
            flexGrow: 1,
            backgroundColor: "var(--amt-secondary)",
            borderRadius: "1em"
        }}>
            <img
                alt={name}
                src={imgSrc}
                style={{
                    backgroundColor: "black",
                    borderRadius: "1em",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    height: "150px",
                    width: "100%",
                }}
            />
            <div className="mt-3" style={{ padding: "1em", display: "flex", alignItems: "flex-end" }}>
                <div>
                    <div className="amt-flex" style={{ justifyContent: "space-between" }}>
                        <p>{name}</p>
                    </div>
                    <div className="mt-3">
                        <p style={{fontSize: "2em"}}>{price}</p>
                        <p className="text-muted">{stops ?? "No stops"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}