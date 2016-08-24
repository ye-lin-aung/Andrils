package<%=pack_name%>;

    import android.support.v7.app.AppCompatActivity;
    import android.os.Bundle;

public class MainActivity extends AppCompatActivity {
  private ActivityMainBinding activityMainBinding;

  @Override protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    activityMainBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);
    setSupportActionBar(activityMainBinding.toolbar.toolbar);
    getSupportActionBar().setTitle(getString(R.string.app_name));
  }
}
