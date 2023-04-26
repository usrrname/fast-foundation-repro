import qs from "qs";
/**
 * Returns a formatted URL for a given Storybook fixture.
 *
 * @param id - the Storybook fixture ID
 * @param args - Story args
 * @returns - the local URL for the Storybook fixture iframe
 */
export function fixtureURL(id = "debug--blank", args) {
    const params = { id };
    if (args) {
        params.args = qs
            .stringify(args, {
            allowDots: true,
            delimiter: ";",
            format: "RFC1738",
            encode: false,
        })
            .replace(/=/g, ":")
            .replace(/\//g, "--");
    }
    const url = qs.stringify(params, {
        addQueryPrefix: true,
        format: "RFC1738",
        encode: false,
    });
    return url;
}
/**
 * A helper that returns a function to bind a Storybook story to a ViewTemplate.
 *
 * @param template - The ViewTemplate to render
 * @returns - a function to bind a Storybook story
 */
export function renderComponent(template) {
    return function (args, { updateArgs }) {
        const storyFragment = new DocumentFragment();
        template.render(Object.assign(Object.assign({}, args), { updateArgs }), storyFragment);
        if (storyFragment.childElementCount === 1) {
            return storyFragment.firstElementChild;
        }
        return storyFragment;
    };
}
