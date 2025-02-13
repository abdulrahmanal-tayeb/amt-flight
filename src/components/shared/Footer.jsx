import { Container } from "@mui/material";
import { Layout } from "../utils/utils";

export default function Footer() {
    return (
        <Layout style={{marginTop: "3em"}}>
            <hr style={{height: "1px", width: "100%"}} />
            <Container >
                <div className="col-12 amt-flex amt-flex-center">
                    <p>AmtFlight - a simple version of <a href="https://www.google.com/travel/flights">Google Flights</a></p>
                </div>
            </Container>
        </Layout>
    )
}