/*
 * vf-banner react component
 * See vf-extensions-react for usage guidance
 *
 */
import {useEffect} from "react";
import {vfBanner} from "@visual-framework/vf-banner/vf-banner";
import {EMPTY} from "../../util/Constants";

function VfBanner({
                      banner__text = EMPTY,
                      banner__message = EMPTY,
                      data_service_id = EMPTY,
                      data_protection_version = EMPTY
                  }) {
    useEffect(() => {
        vfBanner();
    }, []);

    return (
        <div className="vf-banner vf-banner--fixed vf-banner--bottom vf-banner--notice"
             data-vf-js-banner
             data-vf-js-banner-state="dismissible"
             data-vf-js-banner-button-text={banner__text}
             data-vf-js-banner-cookie-name={data_service_id}
             data-vf-js-banner-cookie-version={data_protection_version}
             data-vf-js-banner-auto-accept="false">
            <div className="vf-banner__content | vf-grid" data-vf-js-banner-text>
                <p className="vf-banner__text vf-banner__text--lg"
                   dangerouslySetInnerHTML={{__html: banner__message}}
                ></p>
            </div>
        </div>
    );
}

export default VfBanner;
