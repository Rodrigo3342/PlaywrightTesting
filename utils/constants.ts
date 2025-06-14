export const CREDENTIALS = {
    valid_user: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    invalid_user:{
        username: 'fake_user',
        password: 'wrong_password'
    },
    locked_out_user:{
        username: 'locked_out_user',
        password: 'secret_sauce'
    },
    problem_user:{
        username: 'problem_user',
        password: 'secret_sauce'
    },
    performance_glitch_user:{
        username: 'performance_glitch_user',
        password: 'secret_sauce'
    },
    error_user:{
        username: 'error_user',
        password: 'secret_sauce'
    },
    visual_user:{
        username: 'visual_user',
        password: 'secret_sauce'
    }
}
export const FILTERS={
    AtoZ:{
        order: 'Name (A to Z)'
    },
    ZtoA:{
        order: 'Name (Z to A)'
    },
    LowtoHigh:{
        order: 'Price (low to high)'
    },
    HightoLow:{
        order: 'Price (high to low)'
    }
}