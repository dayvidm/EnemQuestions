import { CardBody, CardDescription, CardFooter, CardRoot, CardTitle } from "@chakra-ui/react";
import { Button } from "./ui/button";

interface CardProps {
    title: string;
    description: string;
    buttonText1?: string;
    buttonText2?: string;
}

const CardComponent = ({ title, description, buttonText1, buttonText2}: CardProps) => {
    return (
        <CardRoot >
            <CardBody gap={2}>
                <CardTitle><h1>{title}</h1></CardTitle>
                <CardDescription>
                   {description}
                </CardDescription>
            </CardBody>
            <CardFooter justifyContent="flex-end">
                {/* <Button variant="outline">{buttonText1}</Button> */}
                <Button>{buttonText2}</Button>
            </CardFooter>
        </CardRoot>
    );
}

export default CardComponent;