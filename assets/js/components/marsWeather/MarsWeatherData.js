import React from 'react';

const MarsWeatherData =  (props) => {
    return (

        <div className=''>
            <table>
                <thead>
                <tr>
                    <th>{props.solKey}</th>
                    <th>Season</th>
                </tr>

                </thead>
                <tbody>
                <tr>
                    <td>
                        {props.atTemp}
                    </td>

                </tr>
                <tr>
                    <td>
                        {props.Season}
                    </td>

                </tr>

                </tbody>


            </table>
        </div>

    )
};

export default MarsWeatherData;