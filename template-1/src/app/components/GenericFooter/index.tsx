const GenericFooter = () => (<>
  <div className='grid-container'>
    <div className='info'>
      <h3 className='uppercase text-[#666]'>Information:</h3>
      <ul className='nav'>
        <li><a href='https://xgroovy.com/info/terms/'>Terms &amp; Conditions</a></li>
        <li><a href='https://xgroovy.com/info/privacy_policy/'>Privacy Policy</a></li>
        <li><a href='https://xgroovy.com/info/cookie_policy/'>Cookie Policy</a></li>
        <li><a href='https://xgroovy.com/info/dmca/'>DMCA/Content Removal</a></li>
        <li><a href='https://xgroovy.com/info/2257/'>2257</a></li>
      </ul>
    </div>
    <div className='support'>
      <h3 className='uppercase text-[#666]'>Support &amp; Help:</h3>
      <ul className='nav'>
        <li><a href='https://xgroovy.com/info/faq/'>FAQ</a></li>
        <li><a href='https://xgroovy.com/info/contact/'>Contact Support</a></li>
        <li><a href='https://xgroovy.com/info/improve/'>Improve XGroovy</a></li>
      </ul>
    </div>
    <div className='work'>
      <h3 className="uppercase text-[#666]">Work With Us:</h3>
      <ul className='nav'>
        <li><a href="https://xgroovy.com/info/advertise/">Advertise</a></li>
        <li><a href="https://xgroovy.com/info/webmasters/">Webmasters</a></li>
        <li><a href="https://xgroovy.com/info/content_partners/">Content Partners</a></li>
        <li><a href="https://xgroovy.com/info/models/">Models</a></li>
      </ul>
    </div>
    <div className="copyr text-[0.8rem]">
      &copy;{new Date().getFullYear()}, XGroovy.com
      <br /> <br />
      <a href="https://www.rtalabel.org/" target="_blank" rel="nofollow">
        <img loading="lazy" width="136" height="60" src="/static/images/rta.png" alt="RTA Label" />
      </a>
    </div>
  </div>
</>)

export default GenericFooter;
