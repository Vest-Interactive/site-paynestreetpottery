<?php

// function get_signup() {
// 	return '<form>
// 	            <h2> Send a Message </h2>
// 	            <ul>
// 	                <li>
// 	                    <input id="name" type="text" name="name" placeholder="Name" onfocus="if(this.value=='Name') this.value='';" onblur="if(this.value=='') this.value='Name';" title="Please add your Name" value="Name"/>
// 	                    <label id="name_label" for="name"> Name </label>

// 	                    <input id="email" type="text" name="email" onfocus="if(this.value=='Email') this.value='';" onblur="if(this.value=='') this.value='Email';" value="Email" placeholder="Email" />
// 	                    <label id="contact_label" for="contact"> Contact </label>
// 	                </li>
// 	                <li>
// 	                    <textarea id="message" placeholder="Message" name="message" rows="5" onfocus="if(this.value=='Message') this.value='';" onblur="if(this.value=='') this.value='Message';" value="Message">Message</textarea>
// 	                    <label id="message_label" for="message">Message</label>
// 	                </li>
// 	                <li>
// 	                    <button type="submit"> Submit </button>
// 	                </li>
// 	            </ul>
// 	        </form>
// 	';
// }
 
function get_signup($atts) {
	return '<form id="send-generic-email">
	            <h2> Send a Message </h2>
	            <p> This will be the area that describes why, how, when to send an email </p>
	            <ul>
	                <li>
	                    <input id="name" type="text" name="name" placeholder="Name" onfocus="if(this.value==\'Name\') this.value=\'\';" onblur="if(this.value==\'\') this.value=\'Name\';" title="Please add your Name" value="Name"/>
	                    <label id="name_label" for="name"> Name </label>

	                    <input id="email" type="text" name="email" onfocus="if(this.value==\'Email\') this.value=\'\';" onblur="if(this.value==\'\') this.value=\'Email\';" value="Email" placeholder="Email" />
	                    <label id="contact_label" for="contact"> Contact </label>
	                </li>
	                <li>
	                	<input id="subject" type="text" name="subject" placeholder="Subject" onfocus="if(this.value==\'Subject\') this.value=\'\';" onblur="if(this.value==\'\') this.value=\'Name\';" title="Please add your Name" value="Name"/>
	                    <label id="subject_label" for="subject"> Subject </label>
	                <li>
	                    <textarea id="message" placeholder="Message" name="message" rows="5" onfocus="if(this.value==\'Message\') this.value=\'\';" onblur="if(this.value==\'\') this.value=\'Message\';" value="Message">Message</textarea>
	                    <label id="message_label" for="message">Message</label>
	                </li>
	                <li>
	                    <button type="submit"> Submit </button>
	                    <div class="unsuccessfulMessage"></div>

	                </li>
	            </ul>
	        </form>';
}
 
?>