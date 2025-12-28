const props = {};

// console.log("First props: " , props);

export default function DefineProps (assignedProps) {
    if (assignedProps === null || assignedProps === undefined) return;

    Object.assign(props, assignedProps);
    // console.log("Defined props: ", props);
}

export function GetProps () {
    if (props === null || props === undefined) return;

    return props;
}

// export function ResetProps () {
//     for (let key in props) {
//         if (props.hasOwnProperty(key)) {
//             delete props[key];
//         }
//     }
// }