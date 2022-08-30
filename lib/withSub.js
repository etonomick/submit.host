import { getToken } from "next-auth/jwt"

const withToken = (handler) => {

    return async (req, res) => {

        const { sub } = await getToken({ req })

        if (!sub) {
            return res.status(401).json({
                error: {
                    message: "User not found"
                }
            })
        }

        req.sub = sub

        return handler(req, res)

    }

}

export default withToken