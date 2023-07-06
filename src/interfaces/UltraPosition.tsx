interface UltraPositionConfig {
    post: string,
    ultraPoint: number
}

const ultraPositionValues = ():Array<UltraPositionConfig> => {
    return[
        {post: "Gardien - G", ultraPoint: 10},
        {post: "Défenseur - D", ultraPoint: 20},
        {post: "Lateral - L", ultraPoint: 21},
        {post: "Milieu défensif - MD", ultraPoint: 30},
        {post: "Milieu offensif - MO", ultraPoint: 31},
        {post: "Attaquant - A", ultraPoint: 40},
    ]
}

export {UltraPositionConfig}
export default ultraPositionValues()